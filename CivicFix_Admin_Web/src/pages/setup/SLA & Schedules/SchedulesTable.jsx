import React, { useState } from "react";
import styled from "@emotion/styled";
import MUIDataTable from "mui-datatables";
import {
  Card as MuiCard,
  Paper as MuiPaper,
  Chip as MuiChip,
  Grid,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Trash } from "lucide-react";

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;

const SchedulesTable = () => {
  const rows = [
    {
      jobName: "Credit Card Chargeback",
      description: "Monthly audit",
      frequency: "Monthly",
      status: "Active",
      startDate: "2021-01-01",
      endDate: "2022-12-31",
      startTime: "09:00",
    },
    {
      jobName: "Debit Card Chargeback",
      description: "Weekly audit",
      frequency: "Weekly",
      status: "Active",
      startDate: "2021-01-01",
      endDate: "2022-12-31",
      startTime: "09:00",
    },
    {
      jobName: "Credit Card Purchase",
      description: "Daily audit",
      frequency: "Daily",
      status: "Paused",
      startDate: "2021-01-01",
      endDate: "2022-12-31",
      startTime: "09:00",
    },
    {
      jobName: "Debit Card Purchase",
      description: "Daily audit",
      frequency: "Daily",
      status: "Active",
      startDate: "2021-01-01",
      endDate: "2022-12-31",
      startTime: "09:00",
    },
    {
      jobName: "Credit Card Refund",
      description: "Daily audit",
      frequency: "Daily",
      status: "Paused",
      startDate: "2021-01-01",
      endDate: "2022-12-31",
      startTime: "09:00",
    },
    {
      jobName: "Debit Card Refund",
      description: "Daily audit",
      frequency: "Daily",
      status: "Active",
      startDate: "2021-01-01",
      endDate: "2022-12-31",
      startTime: "09:00",
    },
    {
      jobName: "Credit Card Verification",
      description: "Daily audit",
      frequency: "Daily",
      status: "Paused",
      startDate: "2021-01-01",
      endDate: "2022-12-31",
      startTime: "09:00",
    },
    {
      jobName: "Debit Card Verification",
      description: "Daily audit",
      frequency: "Daily",
      status: "Active",
      startDate: "2021-01-01",
      endDate: "2022-12-31",
      startTime: "09:00",
    },
    {
      jobName: "Credit Card Chargeback",
      description: "Monthly audit",
      frequency: "Monthly",
      status: "Active",
      startDate: "2021-01-01",
      endDate: "2022-12-31",
      startTime: "09:00",
    },
    {
      jobName: "Debit Card Chargeback",
      description: "Weekly audit",
      frequency: "Weekly",
      status: "Active",
      startDate: "2021-01-01",
      endDate: "2022-12-31",
      startTime: "09:00",
    },
  ];

  const options = {
    filterType: "dropdown",
    selectableRowsHideCheckboxes: true,
  };

  const columns = [
    {
      name: "jobName",
      label: "Job Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "description",
      label: "Description",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "frequency",
      label: "Frequency",
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
        sort: false,
      },
    },
    {
      name: "startDate",
      label: "Start Date",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "endDate",
      label: "End Date",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "startTime",
      label: "Start Time",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Box sx={{ display: "flex" }}>
              <IconButton
                aria-label="edit"
                size="large"
                onClick={() => {
                  console.log(tableMeta.rowData);
                }}
              >
                <Edit />
              </IconButton>
              <IconButton
                aria-label="delete"
                size="large"
                onClick={() => {
                  console.log(tableMeta.rowData);
                }}
              >
                <Trash />
              </IconButton>
            </Box>
          );
        },
      },
    },
  ];

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <MUIDataTable
            title={"Scheduler"}
            data={rows || []}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SchedulesTable;
