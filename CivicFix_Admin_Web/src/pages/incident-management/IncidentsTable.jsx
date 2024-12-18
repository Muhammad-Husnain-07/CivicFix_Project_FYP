import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import Loader from "../../components/Loader";
import {
  Card as MuiCard,
  Paper as MuiPaper,
  Chip as MuiChip,
  Grid,
  Button,
} from "@mui/material";
import { IncidentForm } from "./IncidentForm";

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;

const IncidentsTable = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    fetchData();
    setOpen(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://resolvex-api.graymushroom-01823765.uksouth.azurecontainerapps.io/api/Incidents"
      );
      const data = response?.data;
      if (data) {
        setRows(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    filterType: "dropdown",
    selectableRowsHideCheckboxes: true,
  };

  const columns = [
    {
      name: "channel",
      label: "Channel",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "date",
      label: "Date",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "time",
      label: "Time",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "referenceNumber",
      label: "Incident Ref No.",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "transactionRef",
      label: "Transaction Ref",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "disputeCategory",
      label: "Category",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "criticality",
      label: "Criticality",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          console.log(tableMeta?.rowData);
          return (
            <Chip
              label={tableMeta?.rowData[6]}
              color={
                tableMeta?.rowData[6] === "High"
                  ? "error"
                  : tableMeta?.rowData[6] === "Medium"
                  ? "warning"
                  : tableMeta?.rowData[6] === "Low"
                  ? "primary"
                  : "primary"
              }
            />
          );
        },
      },
    },
    {
      name: "agentID",
      label: "Agent ID",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "resolutionMode",
      label: "Resolution Mode",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Chip
              label={tableMeta?.rowData[9]}
              color={
                tableMeta?.rowData[9] === "Create"
                  ? "success"
                  : tableMeta?.rowData[9] === "Analyze"
                  ? "info"
                  : tableMeta?.rowData[9] === "Pending Review"
                  ? "warning"
                  : tableMeta?.rowData[9] === "Pending Approval"
                  ? "secondary"
                  : tableMeta?.rowData[9] === "Reported"
                  ? "error"
                  : "primary"
              }
            />
          );
        },
      },
    },
  ];

  return (
    <>
      {loading && <Loader />}
      <Grid
        container
        justifyContent="flex-end"
        alignItems="center"
        sx={{ marginTop: "25px" }}
      >
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add Incident
          </Button>
        </Grid>
      </Grid>
      <IncidentForm open={open} handleClose={handleClose} />

      <Grid container spacing={6}>
        <Grid item xs={12} sx={{ marginTop: "20px" }}>
          <MUIDataTable
            title={"Incident Management List"}
            data={rows || []}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default IncidentsTable;
