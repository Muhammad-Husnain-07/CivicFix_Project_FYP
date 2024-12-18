import React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import {
  Button,
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@mui/material";
import TeamTable from "./TeamTable";
import TeamModal from "./TeamModal";

function TeamManagement() {
  const [openModal, setOpenModal] = React.useState(false);

  const handleCloseModal = () => setOpenModal(false);
  return (
    <React.Fragment>
      <Helmet title="Team Management" />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenModal(true)}
          >
            Add Team
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TeamTable />
        </Grid>
      </Grid>
      <TeamModal openModal={openModal} handleCloseModal={handleCloseModal} />
    </React.Fragment>
  );
}

export default TeamManagement;
