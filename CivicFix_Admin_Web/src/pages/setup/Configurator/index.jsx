import React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@mui/material";
import { spacing } from "@mui/system";
import LocationAndTimeConfigurator from "./LocationAndTimeConfigurator";
import DataParameterConfigurator from "./DataParameterConfigurator";
import SecurityAndComplianceConfigurator from "./SecurityAndComplianceConfigurator";

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

function Configurator() {
  return (
    <React.Fragment>
      <Helmet title="Configurator" />
      <Grid container spacing={6}>
        <Grid item xs={4}>
          <LocationAndTimeConfigurator />
        </Grid>
        <Grid item xs={4}>
          <DataParameterConfigurator />
        </Grid>
        <Grid item xs={4}>
          <SecurityAndComplianceConfigurator />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Configurator;
