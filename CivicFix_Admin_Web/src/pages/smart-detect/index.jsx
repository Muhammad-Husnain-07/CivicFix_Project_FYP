
import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  Card as MuiCard,
  CardHeader,
  Chip as MuiChip,
  Paper as MuiPaper,
  Grid,
  Box, 
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import JSONPretty from 'react-json-pretty';
import JsonFormatter from 'react-json-formatter'

import { Gif } from "@mui/icons-material";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
function createData(date, time, source, references) {
  return { date, time, source, references };
}
const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;
  width: 300px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);
const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};
const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const rows = [
  createData('6/4/2024', "23:31:00", "ATM", "AV-001-2481-08"),
  createData('6/4/2024', "23:32:00", "POS", "AV-001-2481-09"),
  createData('6/4/2024', "23:33:00", "WEB", "AV-001-2481-10"),
  createData('6/4/2024', "23:34:00", "APP", "AV-001-2481-11"),
  createData('6/4/2024', "23:35:00", "Others", "AV-001-2481-12"),
  createData('6/4/2024', "23:36:00", "ATM", "AV-001-2481-13"),
  createData('6/4/2024', "23:37:00", "POS", "AV-001-2481-14"),
  createData('6/4/2024', "23:38:00", "WEB", "AV-001-2481-15"),
  createData('6/4/2024', "23:39:00", "APP", "AV-001-2481-16"),
  createData('6/4/2024', "23:40:00", "Others", "AV-001-2481-17"),
  createData('6/4/2024', "23:41:00", "ATM", "AV-001-2481-18"),
  createData('6/4/2024', "23:42:00", "POS", "AV-001-2481-19"),
  createData('6/4/2024', "23:43:00", "WEB", "AV-001-2481-20"),
  createData('6/4/2024', "23:44:00", "APP", "AV-001-2481-21"),
  createData('6/4/2024', "23:45:00", "Others", "AV-001-2481-22"),
];

const steps = [
  { name: "ATM", disputes: 13 },
  { name: "POS", disputes: 4 },
  { name: "WEB", disputes: 8 },
  { name: "VISA-D", disputes: 12 },
  { name: "VISA-C", disputes: 13 },
  { name: "MC-C", disputes: 19 },
  { name: "MC-D", disputes: 5 },
  { name: "BRANCH-D", disputes: 2 },
];

const StepContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  paddingBlock: theme.spacing(2),
}));

const StepBox = styled(Box)(({ theme, active }) => ({
  width: 100,
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

const coreBankingLogs = `{
  "string":"ABCDE",
  "number":1,
  "null":null,
  "boolean":true,
  "object":{
     "string":"ABCDE",
     "number":1,
     "null":null,
     "boolean":true
  },
  "array":[
     1,
     2,
     3,
     4,
     {
     "string":"ABCDE",
     "number":1,
     "null":null,
     "boolean":true,
        "array":[
     1,
     2,
     3,
     4,
     {
     "string":"ABCDE",
     "number":1,
     "null":null,
     "boolean":true
  }
  ]
  }
  ]
}
`
const EFTSwitchLogs = `
{
  "pan": "4941200150088730",
  "rrn": "000000115031",
  "stan": "115031",
  "amount": "1000.00",
  "terminal_id": "ATM001",
  "account_id_1": "50088730",
  "account_id_2": "2223456789012345678",
  "posting_date": "2022-11-11",
  "merchant_type": "",
  "response_code": "000",
  "auth_id_response": "",
  "transaction_date": "2022-11-11",
  "transaction_time": "23:00:00",
  "transaction_type": "CASH-WITHDRAWAL",
  "capture_date_time": "2022-11-11 23:00:00",
  "source_channel_id": "",
  "date_time_internal": "2022-11-11 23:00:00",
  "source_channel_type": "ATM",
  "issuer_institution_id": "959443",
  "destination_channel_id": "",
  "dest_internal": "bank_host"
}

`

const ATMEJLogs = `{
  "string":"ABCDE",
  "number":1,
  "null":null,
  "boolean":true,
  "object":{
     "string":"ABCDE",
     "number":1,
     "null":null,
     "boolean":true
  },
  "array":[
     1,
     2,
     3,
     4,
     {
     "string":"ABCDE",
     "number":1,
     "null":null,
     "boolean":true,
        "array":[
     1,
     2,
     3,
     4,
     {
     "string":"ABCDE",
     "number":1,
     "null":null,
     "boolean":true
  }
  ]
  }
  ]
}
`

const jsonStyle = {
  propertyStyle: { color: 'red' },
  stringStyle: { color: 'green' },
  numberStyle: { color: 'darkorange' }
}
const SmartDetect = () => {
  const [referenceNumber, setReferenceNumber] = useState("AV-001-2481-08");

  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        {steps && steps?.map((step, index) => (
          <React.Fragment key={step.name}>
            <Grid item>
              <StepContainer>
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
      <Grid container spacing={3} sx={{ marginTop: '20px' }}>
        <Grid item xs={4} >  
          <Grid item xs={12} mt={3}>
            <FormControl fullWidth>
              <InputLabel>Card Type</InputLabel>
              <Select
                defaultValue="debit card"
                label="Card Type"
              >
                <MenuItem value="debit card">Debit Card</MenuItem>
                <MenuItem value="Visa">Visa</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} mt={3}>
            <FormControl fullWidth>
              <InputLabel>Transaction Type</InputLabel>
              <Select
                defaultValue="ATM"
                label="Transaction Type"
              >
                <MenuItem value="ATM">ATM</MenuItem>
                <MenuItem value="POS">POS</MenuItem>
                <MenuItem value="WEB">WEB</MenuItem>
                <MenuItem value="APP">APP</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} mt={3}>
            <FormControl fullWidth>
              <InputLabel>System Type</InputLabel>
              <Select
                defaultValue="ATM EJ"
                label="System Type"
              >
                <MenuItem value="Core">Core</MenuItem>
                <MenuItem value="Switch">Switch</MenuItem>
                <MenuItem value="ATM EJ">ATM EJ</MenuItem>
                <MenuItem value="CiT">CiT</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} mt={3}>
            <FormControl fullWidth>
              <InputLabel>Reference Number</InputLabel>
              <Select
                value={referenceNumber}
                label="Reference Number"
                onChange={(e) => setReferenceNumber(e.target.value)}
              >
                <MenuItem value="AV-001-2481-08">AV-001-2481-08</MenuItem>
                <MenuItem value="AV-001-2481-09">AV-001-2481-09</MenuItem>
                <MenuItem value="AV-001-2481-10">AV-001-2481-10</MenuItem>
                <MenuItem value="AV-001-2481-11">AV-001-2481-11</MenuItem>
                <MenuItem value="AV-001-2481-12">AV-001-2481-12</MenuItem>
                <MenuItem value="AV-001-2481-13">AV-001-2481-13</MenuItem>
                <MenuItem value="AV-001-2481-14">AV-001-2481-14</MenuItem>
                <MenuItem value="AV-001-2481-15">AV-001-2481-15</MenuItem>
                <MenuItem value="AV-001-2481-16">AV-001-2481-16</MenuItem>
                <MenuItem value="AV-001-2481-17">AV-001-2481-17</MenuItem>
                <MenuItem value="AV-001-2481-18">AV-001-2481-18</MenuItem>
                <MenuItem value="AV-001-2481-19">AV-001-2481-19</MenuItem>
                <MenuItem value="AV-001-2481-20">AV-001-2481-20</MenuItem>
                <MenuItem value="AV-001-2481-21">AV-001-2481-21</MenuItem>
                <MenuItem value="AV-001-2481-22">AV-001-2481-22</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {referenceNumber && (
          <Grid item xs ={12} sx={{marginTop:'20px'}}>
          <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Source</TableCell>
                    <TableCell>Reference</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.date + row.time}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      selected={row.references === referenceNumber}
                    >
                      <TableCell component="th" scope="row">
                        {row.date}
                      </TableCell>
                      <TableCell align="right">{row.time}</TableCell>
                      <TableCell align="right">{row.source}</TableCell>
                      <TableCell align="right">{row.references}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          )}
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h4" pb={2}>Core Banking Logs</Typography>
        <Paper>  
        <JsonFormatter json={coreBankingLogs} tabWith={4} jsonStyle={jsonStyle} />
        </Paper>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h4" pb={2}>EFT Switch Logs</Typography>
        <Paper>  
        <JsonFormatter json={EFTSwitchLogs} tabWith={4} jsonStyle={jsonStyle} />
        </Paper>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h4" pb={2}>ATM EJ Logs</Typography>
        <Paper>  
        <JsonFormatter json={ATMEJLogs} tabWith={4} jsonStyle={jsonStyle} />
        </Paper>
        </Grid>
      </Grid>
     
     
    </>
  );
};

export default SmartDetect;

