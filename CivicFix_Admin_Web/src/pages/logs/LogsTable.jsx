import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  Card as MuiCard,
  CardHeader,
  Chip as MuiChip,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import { spacing } from "@mui/system";
import {
  MoreVert as MoreVertIcon,
  ContentCopy as ContentCopyIcon,
} from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const Card = styled(MuiCard)(spacing);

const Paper = styled(MuiPaper)(spacing);

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)});
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
`;

function createData(
  seqNo,
  transactionDate,
  type,
  code,
  transactionDesc,
  entryDesc,
  ipAddress,
  user,
  firstName,
  lastName
) {
  return {
    seqNo,
    transactionDate,
    type,
    code,
    transactionDesc,
    entryDesc,
    ipAddress,
    user,
    firstName,
    lastName,
  };
}

const rows = [
  createData(
    917,
    "01/01/2023 22:41:43.88",
    "Audit",
    "ALO",
    "User Logged In",
    "Logged Out: User Master",
    "192.168.0.01",
    "UM",
    "User",
    "Master"
  ),
  createData(
    918,
    "01/01/2023 22:41:43.88",
    "Audit",
    "ALI",
    "User Logged In",
    "Logged Out: User Master",
    "192.168.0.01",
    "UM",
    "User",
    "Master"
  ),
  createData(
    919,
    "01/01/2023 22:41:43.88",
    "Audit",
    "AC",
    "User Logged In",
    "Logged Out: User Master",
    "192.168.0.01",
    "UM",
    "User",
    "Master"
  ),
  createData(
    920,
    "01/01/2023 22:41:43.88",
    "Audit",
    "ALI",
    "User Logged In",
    "Logged Out: User Master",
    "192.168.0.01",
    "UM",
    "Listener",
    "Master"
  ),
  createData(
    921,
    "01/01/2023 22:41:43.88",
    "Audit",
    "ALI",
    "User Logged In",
    "Logged Out: User Master",
    "192.168.0.01",
    "UM",
    "Listener",
    "Master"
  ),
];

const LogsTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [filters, setFilters] = useState({
    logType: "",
    fromDate: null,
    toDate: null,
  });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleExport = (format) => {
    handleMenuClose();
    // Placeholder for export logic based on format
    console.log(`Exporting as ${format}`);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      date: date,
    }));
  };

  const filteredRows = rows.filter((row) => {
    if (filters.logType && row.type !== filters.logType) {
      return false;
    }
    if (filters.fromDate && row.transactionDate < filters.fromDate) {
      return false;
    }
    if (filters.toDate && row.transactionDate > filters.toDate) {
      return false;
    }
    return true;
  });

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <FilterContainer>
          <FormControl
            variant="outlined"
            size="small"
            style={{ minWidth: 150 }}
          >
            <InputLabel id="demo-simple-select-label">Logs Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filters.logType}
              name="logType"
              defaultValue={filters.logType}

              onChange={handleFilterChange}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="User Log">User Logs</MenuItem>
              <MenuItem value="System Log">System Logs</MenuItem>
              <MenuItem value="App Log">App Logs</MenuItem>
              <MenuItem value="Data Log">Data Logs</MenuItem>
              <MenuItem value="Admin Log">Admin Logs</MenuItem>
              <MenuItem value="Change Log">Change Logs</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="From Date"
              name="fromDate"
              value={filters.fromDate}
              onChange={handleDateChange}
              slotProps={{ textField: { size: "small" } }}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" size="small" />
              )}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="To Date"
              name="toDate"
              value={filters.toDate}
              onChange={handleDateChange}
              slotProps={{ textField: { size: "small" } }}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" size="small" />
              )}
            />
          </LocalizationProvider>
        </FilterContainer>
      </Grid>
      <Grid item xs={12} padding={0}>
        <Card mb={6}>
          <CardHeader
            title="Logs"
            action={
              <Grid container alignItems={"center"} spacing={4}>
                <Grid item sm auto>
                  <TextField
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    variant="outlined"
                    size="small"
                    style={{ marginRight: "10px", width: "280px" }}
                  />
                </Grid>
                <Grid item xs auto>
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={handleMenuClick}
                    endIcon={<MoreVertIcon />}
                  >
                    Export
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => handleExport("PDF")}>PDF</MenuItem>
                  </Menu>
                </Grid>
              </Grid>
            }
          />
          <Paper>
            <TableWrapper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Seq #</TableCell>
                    <TableCell>Transaction Date</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Code</TableCell>
                    <TableCell>Transaction Desc</TableCell>
                    <TableCell>Description of Entry</TableCell>
                    <TableCell>Ip Address</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.seqNo}</TableCell>
                      <TableCell>{row.transactionDate}</TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>{row.transactionDesc}</TableCell>
                      <TableCell>{row.entryDesc}</TableCell>
                      <TableCell>{row.ipAddress}</TableCell>
                      <TableCell>{row.user}</TableCell>
                      <TableCell>{row.firstName}</TableCell>
                      <TableCell>{row.lastName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableWrapper>
          </Paper>
        </Card>
      </Grid>
    </Grid>
  );
};

export default LogsTable;
