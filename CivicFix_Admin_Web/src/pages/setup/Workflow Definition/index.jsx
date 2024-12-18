import React, { useState } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
  Box,
  Tab,
  Tabs,
} from "@mui/material";
import { spacing } from "@mui/system";
import WorkflowArea from "./WorkflowArea"
const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

function WorkflowDefinition() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <React.Fragment>
      <Helmet title="Workflow Definition" />
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Box sx={{ height: "100%", borderRight: 1, borderColor: "divider" }}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={selectedTab}
              onChange={handleChange}
              sx={{ borderRight: 1, borderColor: "divider" }}
            >
              <Tab label="Call Centre Assisted" />
              <Tab label="Web Self Service" />
              <Tab label="Smart Lookup" />
              <Tab label="Auto Detect Incidents" />
              <Tab label="Dispute Review" />
              <Tab label="Approve/Reject" />
              <Tab label="Posting" />
            </Tabs>
          </Box>
        </Grid>

        <Grid item xs={9}>
          <Box
            sx={{
              flexGrow: 1,
              p: 3,
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            {selectedTab === 0 && <WorkflowArea />}
            {/* Add other tab components similarly */}
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default WorkflowDefinition;
