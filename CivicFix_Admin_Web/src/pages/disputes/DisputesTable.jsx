import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import Loader from "../../components/Loader";

import {
  Card as MuiCard,
  CardHeader,
  Chip as MuiChip,
  Paper as MuiPaper,
  Grid,
  Box,
  Typography,
} from "@mui/material";

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;

const columns = [
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
      filter: true,
      sort: false,
    },
  },
  {
    name: "channel",
    label: "Channel",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "customerID",
    label: "Customer ID",
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: "transactionType",
    label: "Transaction Type",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "transactionNo",
    label: "Transaction No",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "amount",
    label: "Amount(AED)",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "disputeType",
    label: "Dispute Type",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "disputeStatus",
    label: "Dispute Status",
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <Chip
            label={tableMeta?.rowData[8]}
            color={
              tableMeta?.rowData[8] === "Create"
                ? "success"
                : tableMeta?.rowData[8] === "Analyze"
                ? "info"
                : tableMeta?.rowData[8] === "Pending Review"
                ? "warning"
                : tableMeta?.rowData[8] === "Pending Approval"
                ? "secondary"
                : tableMeta?.rowData[8] === "Reported"
                ? "error"
                : "primary"
            }
          />
        );
      },
    },
  },
  {
    name: "location",
    label: "Location",
    options: {
      filter: true,
      sort: false,
    },
  },
];

const options = {
  filterType: "dropdown",
  selectableRowsHideCheckboxes: true,
};

const StepContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  paddingBlock: theme.spacing(2),
  cursor: "pointer",
}));

const StepBox = styled(Box)(({ theme, active }) => ({
  width: 150,
  height: 50,
  borderRadius: 10,
  backgroundColor: theme.palette.primary.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  marginBottom: theme.spacing(1),
  boxShadow: theme.shadows[3],
}));

const Line = styled(Box)(({ theme }) => ({
  width: 50,
  height: 2,
  backgroundColor: theme.palette.primary.main,
}));

const DisputesTable = ({ theme }) => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState({ stepName: "", rows: [] });
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://resolvex-api.graymushroom-01823765.uksouth.azurecontainerapps.io/api/charts/dispute-status"
        );
        const data = response?.data?.data;
        if (data) {
          setRows(data);

          const uniqueDisputeStatus = [
            ...new Set(data.map((item) => item.disputeStatus)),
          ];
          const stepCounts = uniqueDisputeStatus.map((status) => ({
            name: status,
            disputes: data.filter((item) => item.disputeStatus === status)
              .length,
          }));
          setSteps(stepCounts);
          setLoading(false);
        } else {
          setLoading(false);
          setRows([]);
          setSteps([]);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {loading && (
        <Grid container justifyContent="center" alignItems="center">
          <Loader />
        </Grid>
      )}
      <>
        <Grid container justifyContent="center" alignItems="center">
          {steps &&
            steps?.map((step, index) => (
              <React.Fragment key={step.name}>
                <Grid item>
                  <StepContainer
                    onClick={(e) =>
                      step.name === filteredRows.stepName
                        ? setFilteredRows({ stepName: "", rows: [] })
                        : setFilteredRows({
                            stepName: step.name,
                            rows: rows.filter(
                              (row) => row.disputeStatus === step.name
                            ),
                          })
                    }
                    style={{
                      opacity:
                        filteredRows.stepName === ""
                          ? 1
                          : step.name === filteredRows.stepName
                          ? 1
                          : 0.5,
                    }}
                  >
                    <StepBox>
                      <Typography variant="body1">{step.name}</Typography>
                    </StepBox>
                    <Typography variant="caption">
                      {step.disputes} disputes
                    </Typography>
                  </StepContainer>
                </Grid>
                {index < steps.length - 1 && (
                  <Grid item mb={4}>
                    <Line />
                  </Grid>
                )}
              </React.Fragment>
            ))}
        </Grid>
        <Grid container spacing={6}>
          <Grid item xs={12} sx={{ marginTop: "20px" }}>
            <MUIDataTable
              title={"Disputes List"}
              data={
                filteredRows?.rows?.length > 0 ? filteredRows?.rows : rows || []
              }
              columns={columns}
              options={options}
            />
          </Grid>
        </Grid>
      </>
    </>
  );
};

export default DisputesTable;
