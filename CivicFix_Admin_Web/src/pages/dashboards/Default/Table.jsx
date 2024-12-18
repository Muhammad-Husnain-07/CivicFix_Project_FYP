import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { MoreVertical } from "lucide-react";

import {
  Card as MuiCard,
  CardHeader,
  IconButton,
  Chip as MuiChip,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Chip,
} from "@mui/material";
import { spacing } from "@mui/system";
import axios from "axios";

const Card = styled(MuiCard)(spacing);

const Paper = styled(MuiPaper)(spacing);

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)});
`;

const DashboardTable = () => {
  const [value, setValue] = useState(0);
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      setFilteredRows(filterRows("date"));
    } else if (newValue === 1) {
      setFilteredRows(filterRows("amount"));
    }
  };

  const filterRows = (key) => {
    const sortedRows = [...rows].sort(
      (a, b) => new Date(b[key]) - new Date(a[key])
    );
    return sortedRows.slice(0, 5);
  };
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
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredRows(filterRows("date"));
  }, [rows]);
  
  return (
    <Card mb={6}>
      <CardHeader
        action={
          <IconButton aria-label="settings" size="large">
            <MoreVertical />
          </IconButton>
        }
        title="Disputes Status"
      />
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
      >
        <Tab label="Ageing" />
        <Tab label="$ Value" />
        <Tab label="Criticality Flag" />
      </Tabs>
      <Paper sx={{ p: 2 }}>
        <TableWrapper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Channel</TableCell>
                <TableCell>Customer ID</TableCell>
                <TableCell>Transaction Type</TableCell>
                <TableCell>Transaction No</TableCell>
                <TableCell>Amount(AED)</TableCell>
                <TableCell>Dispute Type</TableCell>
                <TableCell>Dispute Status</TableCell>
                <TableCell>Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  <TableCell>{row.channel}</TableCell>
                  <TableCell>{row.customerID}</TableCell>
                  <TableCell>{row.transactionType}</TableCell>
                  <TableCell>{row.transactionNo}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.disputeType}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.disputeStatus}
                      color={
                        row.disputeStatus === "Create"
                          ? "success"
                          : row.disputeStatus === "Analyze"
                          ? "info"
                          : row.disputeStatus === "Pending Review"
                          ? "warning"
                          : row.disputeStatus === "Pending Approval"
                          ? "secondary"
                          : row.disputeStatus === "Reported"
                          ? "error"
                          : "primary"
                      }
                    />
                  </TableCell>
                  <TableCell>{row.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
      </Paper>
    </Card>
  );
};

export default DashboardTable;
