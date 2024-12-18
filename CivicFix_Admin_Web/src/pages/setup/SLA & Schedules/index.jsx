import React, { useState } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
  Button as MuiButton,
} from "@mui/material";
import { spacing } from "@mui/system";
import { SLASettingModal } from "./SLASettingModal";
import SchedulesTable from "./SchedulesTable";
import SchedulesModal from "./SchedulesModal";

const Button = styled(MuiButton)(spacing);

function SLASchedules({ theme }) {
  const [openModal, setOpenModal] = useState(false);
  const [openScheduleModal, setOpenScheduleModal] = useState(false);

  const handleCloseModal = () => setOpenModal(false);
  const handleCloseScheduleModal = () => setOpenScheduleModal(false);
  return (
    <React.Fragment>
      <Helmet title="SLA & Schedules" />
      <Grid container spacing={6}>
        <Grid
          container
          item
          xs={12}
          display={"flex"}
          justifyContent={"flex-end"}
          spacing={2}
        >
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenScheduleModal(true)}
            >
              Add Job
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenModal(true)}
            >
              SLA Settings
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <SchedulesTable />
        </Grid>
      </Grid>
      <SchedulesModal
        openModal={openScheduleModal}
        handleCloseModal={handleCloseScheduleModal}
      />
      <SLASettingModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      />
    </React.Fragment>
  );
}

export default SLASchedules;
