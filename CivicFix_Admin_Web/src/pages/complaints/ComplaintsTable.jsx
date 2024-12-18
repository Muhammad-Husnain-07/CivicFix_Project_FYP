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
    name: "complaintNo",
    label: "Complaint No",
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
      filter: true,
      sort: false,
    },
  },
  {
    name: "customerName",
    label: "Customer Name",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "complaintCategory",
    label: "Complaint Category",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "complaintType",
    label: "Complaint Type",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "complaintStatus",
    label: "Complaint Status",
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <Chip
            label={value}
            color={
              value === "Pending"
                ? "warning"
                : value === "In Progress"
                ? "info"
                : value === "Closed"
                ? "error"
                : value === "Resolved"
                ? "success"
                : "error"
            }
          />
        );
      },
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

const ComplaintsTable = ({ theme }) => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState({ stepName: "", rows: [] });
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // const response = await axios.get(
        //   "https://resolvex-api.graymushroom-01823765.uksouth.azurecontainerapps.io/api/charts/dispute-status"
        // );
        // const data = response?.data?.data;
        const data = Array.from({ length: 1000 }).map((_, i) => ({
          id: i + 1,
          date: new Date(
            Date.now() - (i + 1) * 1000 * 60 * 60 * 24
          ).toISOString(),
          time: new Date(
            Date.now() - (i + 1) * 1000 * 60 * 60 * 24
          ).toLocaleTimeString(),
          customerName: `John Doe ${i + 1}`,
          complaintCategory: "Complaint Category",
          complaintType: "Complaint Type",
          complaintNo: `C${i + 1}`,
          complaintStatus: ["Pending", "In Progress", "Resolved", "Closed"][
            i % 4
          ],
        }));
        if (data) {
          setRows(data);

          const uniqueComplaintStatus = [
            ...new Set(data.map((item) => item.complaintStatus)),
          ];
          const stepCounts = uniqueComplaintStatus.map((status) => ({
            name: status,
            complaints: data.filter((item) => item.complaintStatus === status)
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
                              (row) => row.complaintStatus === step.name
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
                      {step.complaints} Complaints
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
              title={"Complaints List"}
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

export default ComplaintsTable;
