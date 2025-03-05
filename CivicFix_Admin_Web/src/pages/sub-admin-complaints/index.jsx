import React from "react";
import styled from "@emotion/styled";
import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@mui/material";
import { spacing } from "@mui/system";
import ComplaintsTable from "./ComplaintsTable";

const Typography = styled(MuiTypography)(spacing);
function SubAdminComplaints() {
  return (
    <React.Fragment>
   <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <ComplaintsTable />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default SubAdminComplaints;
