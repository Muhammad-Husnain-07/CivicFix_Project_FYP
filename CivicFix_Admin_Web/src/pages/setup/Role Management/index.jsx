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
import RolesTable from "./RolesTable";

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

function RoleManagement() {
  return (
    <React.Fragment>
      <Helmet title="Role Management" />

      <Grid container spacing={6}>
        <Grid item xs={12} lg={12}>
          <RolesTable />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default RoleManagement;
