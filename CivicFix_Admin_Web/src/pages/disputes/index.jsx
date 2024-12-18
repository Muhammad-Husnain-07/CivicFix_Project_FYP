import React from "react";
import styled from "@emotion/styled";
import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@mui/material";
import { spacing } from "@mui/system";
import DisputesTable from "./DisputesTable";

const Typography = styled(MuiTypography)(spacing);
function Disputes() {
  return (
    <React.Fragment>
   <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <DisputesTable />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Disputes;
