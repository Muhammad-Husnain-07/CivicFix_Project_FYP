import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import MUIDataTable from "mui-datatables";
import Loader from "../../components/Loader";

import {
  Card as MuiCard,
  CardHeader,
  Chip as MuiChip,
  Paper as MuiPaper,
  Grid,
} from "@mui/material";
import apiClient from "../../utils/axiosConfig";
import ComplaintDetails from "./ComplaintDetails";

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ComplaintsTable = ({ theme }) => {
  const [rows, setRows] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get("/complaints?department="+localStorage.getItem("department"));
        const data = response;
        if (data) {
          setRows(
            data.map((row) => {
              return {
                ...row,
                submission_date: new Date(row.submission_date).toLocaleDateString(),
              };
            })
          );
          setLoading(false);
        } else {
          setLoading(false);
          setRows([]);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data: ", error);
      }
    };

    const getTeams = async () => {
      try {
        const response = await apiClient.get("/teams/list");
        const data = response;
        if (data) {
          setTeams(data?.filter((team) => team.department == localStorage.getItem("department_id")));
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }

    }
    getTeams();
    fetchData();
  }, []);
  const columns = [
    {
      name: "complaint_id",
      label: "ID",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "ref_number",
      label: "Reference Number",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "complaint_category",
      label: "Complaint Category",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "complaint_type",
      label: "Complaint Type",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "submission_date",
      label: "Submission Date",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return value ? (
            <Chip
              label={value}
              color={
                value?.toLowerCase() === "pending"
                  ? "warning"
                  : value?.toLowerCase() === "in progress"
                  ? "info"
                  : value?.toLowerCase() === "resolved"
                  ? "success"
                  : "error"
              }
            />
          ) : null;
        },
      },
    },
    {
      name: "assigned_team_id",
      label: "Assigned Team",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return teams?.find((team) => team.id === value)?.name || "N/A";
        }
      },
    },
    {
      name: "resolved_status",
      label: "Resolved Status",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return value ? (
            <Chip
              label={value}
              color={
                value?.toLowerCase() === "completed"
              ? "success"
              : value?.toLowerCase() === "closed"
              ? "error"
              : "warning"
              }
            />
          ) : "N/A";
        },
      },
    },
  ];
  return (
    <>
      {loading && (
        <Grid container justifyContent="center" alignItems="center">
          <Loader />
        </Grid>
      )}
      <>
        <Grid container spacing={6}>
          <Grid item xs={12} sx={{ marginTop: "20px" }}>
            <MUIDataTable
              title={"Complaints List"}
              data={rows || []}
              columns={columns}
              options={{
                filterType: "dropdown",
                selectableRows: "none",
                onRowClick: (rowData, rowMeta) => {
                  setOpen(true);
                  setSelectedRow(rows[rowMeta.dataIndex]);
                },
              }}
            />
          </Grid>
        </Grid>
      </>
      <ComplaintDetails selectedRow={selectedRow} open={open} setOpen={setOpen} teams={teams}/>
    </>
  );
};

export default ComplaintsTable;
