import React, { useState } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@mui/material";
import { spacing } from "@mui/system";
import DataSourceDefinitionTable from "./DataSourceDefinitionTable";

const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);

function DataSourceManagement() {
  return (
    <React.Fragment>
      <Helmet title="Data Source Management" />
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <DataSourceDefinitionTable />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default DataSourceManagement;
