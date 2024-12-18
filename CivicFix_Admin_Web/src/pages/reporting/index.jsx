import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Divider,
  Chip as MuiChip,
  List,
  ListItem,
  ListItemText,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import { ListAlt, PictureAsPdf } from "@mui/icons-material";
import { styled } from "@mui/system";
import { GenerateReports } from "./GenerateReports";

const Chip = styled(MuiChip)`
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;
const Reporting = () => {
  // State for selected report and filter values
  const [selectedReport, setSelectedReport] = useState(null);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [openFiltersModal, setOpenFiltersModal] = useState(false);

  // Dummy data for reports and report details (replace with actual data fetching)
  const reports = [
    { id: 12, name: "Account Balances Report" },
    { id: 4, name: "ATM Cash Remaining Report" },
    { id: 7, name: "ATM Declined and Suspicious Transaction Report" },
    { id: 14, name: "ATM Exceptions Report" },
    { id: 11, name: "ATM Manual Reconciliation Report" },
    { id: 3, name: "ATM Net Cash Withdrawal Report" },
    { id: 5, name: "ATM Replenishment Report" },
    { id: 1, name: "ATM Transaction Report" },
    { id: 8, name: "ATM Unbalanced  Report" },
    { id: 13, name: "Digital Transaction Report" },
    { id: 17, name: "Home Finance 12M Report" },
    { id: 10, name: "Matched Transactions Report" },
    { id: 15, name: "Nostro Matching Report" },
    { id: 16, name: "Nostro Statement Report" },
    { id: 0, name: "UI Audit Report" },
  ];
  const reportDetails = reports.reduce((acc, report) => {
    acc[report.id] = Array.from(
      { length: Math.floor(Math.random() * 5) + 1 },
      (_, i) => {
        return {
          id: i + 1,
          dateFrom: `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${new Date()
            .getDate()
            .toString()
            .padStart(2, "0")}`,
          dateTo: `${new Date().getFullYear()}-${(new Date().getMonth() + 2)
            .toString()
            .padStart(2, "0")}-${new Date()
            .getDate()
            .toString()
            .padStart(2, "0")}`,
          outputFile: `${report.name.toLowerCase().replace(/ /g, "_")}.${
            ["csv", "pdf"][Math.floor(Math.random() * 2)]
          }`,
          status: ["Completed", "In Progress", "Error"][
            Math.floor(Math.random() * 3)
          ],
        };
      }
    );
    return acc;
  }, {});

  // Handler for selecting a report
  const handleReportSelect = (report) => {
    setSelectedReport(report);
  };

  // Handler for opening the filters modal
  const handleOpenFiltersModal = () => {
    setOpenFiltersModal(true);
  };

  // Handler for closing the filters modal
  const handleCloseFiltersModal = () => {
    setOpenFiltersModal(false);
  };

  // Handler for generating reports (dummy function)
  const handleGenerateReports = () => {
    // Implement your logic for generating reports
    console.log(`Generating reports from ${dateFrom} to ${dateTo}`);
    handleCloseFiltersModal(); // Close modal after generating reports
  };

  return (
    <Box p={3}>
      {/* Filters button */}
      <Grid container justifyContent="flex-end" mb={3}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenFiltersModal}
          >
            Generate Reports
          </Button>
        </Grid>
      </Grid>
      {/* Main content area */}
      <Grid container spacing={3}>
        {/* Sidebar with list of reports */}
        <Grid item xs={3}>
          <Paper>
            <Typography variant="h6" style={{ padding: "10px" }}>
              Reports
            </Typography>
            <Divider />
            <List>
              {reports.map((report) => (
                <ListItem
                  button
                  key={report.id}
                  onClick={() => handleReportSelect(report)}
                  selected={selectedReport?.id === report?.id}
                >
                  <ListItemText primary={report.name} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Report details */}
        <Grid item xs={9}>
          <Paper>
            {selectedReport ? (
              <div style={{ padding: "20px" }}>
                <Typography variant="h6">{selectedReport?.name}</Typography>
                <Divider style={{ margin: "10px 0" }} />

                {/* Table of report details */}
                <TableContainer style={{ marginTop: "20px" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date From</TableCell>
                        <TableCell>Date To</TableCell>
                        <TableCell>Output File Name</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {reportDetails[selectedReport?.id]?.map((detail) => (
                        <TableRow key={detail.id}>
                          <TableCell>{detail.dateFrom}</TableCell>
                          <TableCell>{detail.dateTo}</TableCell>
                          <TableCell>{detail.outputFile}</TableCell>
                          <TableCell>
                            <Chip
                              label={detail.status}
                              color={
                                detail.status == "Error"
                                  ? "error"
                                  : detail.status == "Completed"
                                  ? "success"
                                  : "warning"
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton color="primary">
                              <PictureAsPdf color="error" />
                            </IconButton>
                            <IconButton color="primary">
                              <ListAlt color="success" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            ) : (
              <Typography variant="h6" style={{ padding: "20px" }}>
                Select a report to view details
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
      <GenerateReports
        dateFrom={dateFrom}
        dateTo={dateTo}
        handleGenerateReports={handleGenerateReports}
        handleCloseFiltersModal={handleCloseFiltersModal}
        openFiltersModal={openFiltersModal}
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
      />
    </Box>
  );
};

export default Reporting;
