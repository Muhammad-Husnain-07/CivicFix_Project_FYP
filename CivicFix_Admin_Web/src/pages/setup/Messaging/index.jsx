import React, { useState } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import {
  Tabs,
  Tab,
  Box,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  Divider as MuiDivider,
  Typography as MuiTypography,
  Grid,
  InputLabel,
  FormControl,
} from "@mui/material";
import { spacing } from "@mui/system";

const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  width: "100%",
}));

const Messaging = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [frequency, setFrequency] = useState("");
  const [region, setRegion] = useState([]);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const handleFrequencyChange = (event) => {
    setFrequency(event.target.value);
  };

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  const renderApplicationAlertForm = () => (
    <Box sx={{ width: "50%", ml: "auto", mr: "auto" }}>
      <StyledBox>
        <TextField label="Name" required />
        <FormControl required>
          <InputLabel>Frequency</InputLabel>
          <Select value={frequency} onChange={handleFrequencyChange}>
            <MenuItem value="as it happens">As it happens</MenuItem>
            <MenuItem value="hourly">Hourly</MenuItem>
            <MenuItem value="daily">Daily</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Sources" required />
        <FormControl required>
          <InputLabel>Region</InputLabel>
          <Select value={region} onChange={handleRegionChange} multiple>
            <MenuItem value="North America">North America</MenuItem>
            <MenuItem value="Europe">Europe</MenuItem>
            <MenuItem value="Asia">Asia</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Deliver to" required />
        <Button variant="contained">Add Alert</Button>
      </StyledBox>
    </Box>
  );

  const renderEmailGatewayForm = () => (
    <Box sx={{ display: "flex", gap: 20 }}>
      <StyledBox>
        <Typography variant="h6" gutterBottom>
          Outgoing Message Server (SMTP)
        </Typography>
        <TextField label="SMTP Server" required />
        <TextField label="Port" type="number" required />
        <FormControlLabel control={<Switch />} label="Use SSL" />
        <FormControl required>
          <InputLabel>Authentication</InputLabel>
          <Select>
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="basic">Basic</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Login" required />
        <TextField label="Password" type="password" required />
        <Button variant="contained">Send Test Message</Button>
      </StyledBox>
      <StyledBox>
        <Typography variant="h6" gutterBottom>
          Incoming Message Server (POP3)
        </Typography>
        <TextField label="SMTP Server" required />
        <TextField label="Port" type="number" required />
        <FormControlLabel control={<Switch />} label="Enable SSL" />
        <FormControl required>
          <InputLabel>Authentication</InputLabel>
          <Select>
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="basic">Basic</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Login" required />
        <TextField label="Password" type="password" required />
        <TextField label="Polling Delay" type="number" />
        <Button variant="contained">Check Connection</Button>
      </StyledBox>
    </Box>
  );

  const renderSMSGatewayForm = () => (
    <Box sx={{ width: "50%", ml: "auto", mr: "auto" }}>
      <StyledBox>
        <Typography variant="h6" gutterBottom>
          SMS Gateway Setting
        </Typography>
        <TextField label="SMS Gateway URL" required />
        <TextField label="SMS Gateway Request Query" required />
        <TextField label="SMS Gateway API ID" required />
        <TextField label="SMS Gateway User Name" required />
        <TextField label="SMS Gateway Password" type="password" required />
        <TextField label="SMS Gateway Success Response" required />
        <Button variant="contained">Submit</Button>
        <Button variant="contained">Reset</Button>
        <Divider my={6} />
        <Typography variant="h6" gutterBottom>
          Test SMS Gateway Settings
        </Typography>
        <TextField label="Test Mobile Number" required />
        <Button variant="contained">Send Text SMS</Button>
      </StyledBox>
    </Box>
  );

  return (
    <React.Fragment>
      <Helmet title="Messaging" />
      <Grid container justifyContent="space-between" spacing={6}>
        <Grid item xs={12}>
          <Tabs value={tabIndex} onChange={handleTabChange} centered>
            <Tab label="Application Alert" />
            <Tab label="Email Gateway" />
            <Tab label="SMS Gateway" />
          </Tabs>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Box>
        {tabIndex === 0 && renderApplicationAlertForm()}
        {tabIndex === 1 && renderEmailGatewayForm()}
        {tabIndex === 2 && renderSMSGatewayForm()}
      </Box>
    </React.Fragment>
  );
};

export default Messaging;
