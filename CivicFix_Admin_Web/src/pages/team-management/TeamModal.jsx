import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Grid,
  Button,
  MenuItem,
  Autocomplete,
  FormHelperText,
} from "@mui/material";
import { X } from "lucide-react";
import apiClient from "../../utils/axiosConfig";
import Toast from "../../components/snackbar/Toast";

const TeamModal = ({ openModal, handleCloseModal, getTeamUsers, rowData }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [users, setUsers] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [state, setState] = useState({
    name: "",
    team_members: [],
  });
  const [errors, setErrors] = useState({
    name: "",
    team_members: "",
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitForm = () => {
    if (!state.name) {
      setErrors({ ...errors, name: "Team name is required" });
      Toast("Team name is required", "warning");
      return;
    }
    if (!state.team_members.length) {
      setErrors({ ...errors, team_members: "At least one team member is required" });
      Toast("At least one team member is required", "warning");
      return;
    }
    const dataToSubmit = { ...state };
    console.log(dataToSubmit);
    try {
      if (isUpdate) {
        apiClient
          .put(`/team/${rowData.id}/update`, dataToSubmit)
          .then(() => {
            getTeamUsers();
            handleCloseModal();
            Toast("Team updated successfully", "success");
          })
          .catch((error) => {
            console.log(error);
            Toast("Error updating team", "error");
          });
      } else {
        apiClient
          .post("/team/create", {
            ...dataToSubmit,
            department: localStorage.getItem("department_id"),
          })
          .then(() => {
            getTeamUsers();
            handleCloseModal();
            Toast("Team created successfully", "success");
          })
          .catch((error) => {
            console.log(error);
            Toast("Error creating team", "error");
          });
      }
    } catch (error) {
      console.log(error);
      Toast("Error creating team", "error");
    }
  };

  useEffect(() => {
    if (rowData) {
      setIsUpdate(true);
      setState(rowData);
    } else {
      setIsUpdate(false);
      setState({
        name: "",
        department: null,
        team_members: [],
      });
    }
  }, [rowData]);

  useEffect(() => {
    const getUsers = async () => {
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
    const getAvailableUsers = async () => {
      try {
        const response = await apiClient.get("/teamusers-available");
        const data = response;
        if (data) {
          setAvailableUsers(data);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getUsers();
    getAvailableUsers();
  }, []);
  const userOptions = availableUsers
    .filter((user) => user.department == localStorage.getItem("department_id"))
    .map(({ id, name }) => ({ label: name, value: id }));
  return (
    <Dialog open={openModal} onClose={handleCloseModal}>
      <DialogTitle>
        <Grid
          container
          display={"flex"}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>{isUpdate ? "Edit Team" : "Add Team"}</Grid>
          <Grid item>
            <IconButton aria-label="close" onClick={handleCloseModal}>
              <X />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Team Name"
              type="text"
              fullWidth
              name="name"
              value={state.name}
              onChange={handleChange}
              error={errors.name ? true : false}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="team_members"
              options={userOptions || []}
              getOptionLabel={(option) => option.label}
              getOptionSelected={(option, value) =>
                option.value === value.value
              }
              onChange={(event, value) => {
                setState({ ...state, team_members: value.map((v) => v.value) });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Team Members"
                  placeholder="Team Members"
                  error={errors.team_members ? true : false}
                  helperText={errors.team_members}
                />
              )}
              value={state.team_members.map((id) => ({
                label: users.find((user) => user.id === id)?.name,
                value: id,
              }))}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} variant="contained">
          Cancel
        </Button>
        <Button onClick={handleSubmitForm} variant="contained">
          {isUpdate ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TeamModal;

