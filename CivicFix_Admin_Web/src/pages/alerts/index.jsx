import React from "react";
import styled from "@emotion/styled";
import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@mui/material";
import { spacing } from "@mui/system";
import AutoDetectAlerts from "./AutoDetectAlerts";
import ReviewAlerts from "./ReviewAlerts";
import SLAAlerts from "./SLAAlerts";
import StatusAlerts from "./StatusAlerts";

const Typography = styled(MuiTypography)(spacing);
const Divider = styled(MuiDivider)(spacing);

function Alerts() {
  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <ReviewAlerts />
        </Grid>
        <Grid item xs={12} md={6}>
          <AutoDetectAlerts />
        </Grid>
        <Grid item xs={12} md={6}>
          <SLAAlerts />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatusAlerts />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Alerts;
