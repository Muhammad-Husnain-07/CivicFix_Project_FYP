import React from "react";
import styled from "@emotion/styled";
import {
  Grid,
  Box as MuiBox,
  Typography as MuiTypography,
} from "@mui/material";
import { spacing } from "@mui/system";
import LogsTable from "./LogsTable";

const Box = styled(MuiBox)(spacing);
const Typography = styled(MuiTypography)(spacing);
function Logs() {
  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Box borderRadius={5} bgcolor="background.paper" p={5}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={2} lg={2}>
                <Typography variant="h6" color="text.secondary">
                  Access Date
                </Typography>
                <Typography variant="subtitle1">2/6/2024</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={2} lg={2}>
                <Typography variant="h6" color="text.secondary">
                  Access Time
                </Typography>
                <Typography variant="subtitle1">10:30:00</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2}>
                <Typography variant="h6" color="text.secondary">
                  User
                </Typography>
                <Typography variant="subtitle1" color="text.primary">
                  John Doe
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={2} lg={2}>
                <Typography variant="h6" color="text.secondary">
                  Access Title
                </Typography>
                <Typography variant="subtitle1">Audit Manager</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={2} lg={2}>
                <Typography variant="h6" color="text.secondary">
                  Department
                </Typography>
                <Typography variant="subtitle1">Compliance</Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <LogsTable />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Logs;
