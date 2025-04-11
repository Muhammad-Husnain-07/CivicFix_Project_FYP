import React, { useEffect, useState } from "react";
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
import apiClient from "../../utils/axiosConfig";

function TeamManagement() {
  const [rowData, setRowData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);

  const handleCloseModal = () => {
    setOpenModal(false);
    setRowData(null);
  };

  const getTeam = async () => {
    try {
      const response = await apiClient.get("/teams/list");
      const data = response;
      if (data) {
        setData(
          data.filter((team) => team.department == localStorage.getItem("department_id"))
        );
}    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const getTeamUsers = async () => {
    try {
      const response = await apiClient.get("/teamusers");
      const data = response;
      if (data) {
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getTeam();
    getTeamUsers();
  }, []);

  return (
    <>
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
          <TeamTable setRowData={setRowData} setOpenModal={setOpenModal} data={data} users={users}/>
        </Grid>
      </Grid>
      {openModal && <TeamModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        rowData={rowData}
        getTeam={getTeam}
        getTeamUsers={getTeamUsers}
      />}
    </>
  );
}

export default TeamManagement;

