import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import {
  Button,
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@mui/material";
import TeamTable from "./TeamUserTable";
import TeamModal from "./TeamUserModal";
import apiClient from "../../utils/axiosConfig";

function TeamMemberManagement() {
  const [rowData, setRowData] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [data, setData] = React.useState([]);

  const handleCloseModal = () => {
    setOpenModal(false);
    setRowData(null);
  };

  const getTeamUsers = async () => {
    try {
      const response = await apiClient.get("/teamusers");
      const data = response;
      if (data) {
        setData(data?.filter((team) => team.department == localStorage.getItem("department_id")));
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getTeamUsers();
  }, []);

  return (
    <React.Fragment>
      <Helmet title="Team Member Management" />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenModal(true)}
          >
            Add Team Member
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TeamTable setRowData={setRowData} setOpenModal={setOpenModal} data={data} />
        </Grid>
      </Grid>
      <TeamModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        rowData={rowData}
        getTeamUsers={getTeamUsers}
      />
    </React.Fragment>
  );
}

export default TeamMemberManagement;

