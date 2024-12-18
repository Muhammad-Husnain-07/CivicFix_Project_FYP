import React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import {
  Grid,
  Box as MuiBox,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@mui/material";
import { spacing } from "@mui/system";
import { DatabaseSection } from "./DatabaseSection";
import TableVisualizer from "./TableVisualizer";

const Divider = styled(MuiDivider)(spacing);
const Box = styled(MuiBox)(spacing);
const Typography = styled(MuiTypography)(spacing);

function DatabaseManagement() {
  return (
    <React.Fragment>
      <Helmet title="DatabaseManagement" />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DatabaseSection />
          </Grid>
        </Grid>
    </React.Fragment>
  );
}

export default DatabaseManagement;
