import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Grid,
  Button,
} from "@mui/material";
import { X } from "lucide-react";
import apiClient from "../../utils/axiosConfig";

const TeamModal = ({ openModal, handleCloseModal, getTeamUsers, rowData }) => {
  const [departments, setDepartments] = React.useState([]);
  const [isUpdate, setIsUpdate] = React.useState(rowData?.id ? true : false);
  const [state, setState] = React.useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitForm = () => {
    const dataToSubmit = { ...state };
    try {
      if (isUpdate) {
        apiClient
          .put(`/teamusers/${rowData.id}/update`, dataToSubmit)
          .then((response) => {
            getTeamUsers();
            handleCloseModal();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        apiClient
          .post("/teamusers/create", {
            ...dataToSubmit,
            department:  localStorage.getItem("department_id"),
          })
          .then((response) => {
            getTeamUsers();
            handleCloseModal();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
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
        phone: "",
        email: "",
        password: "",
      });
    }
  }, [rowData]);

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const response = await apiClient.get("/departments");
        const data = response;
        if (data) {
          setDepartments(data);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getDepartments();
  }, []);
  return (
    <Dialog open={openModal} onClose={handleCloseModal}>
      <DialogTitle>
        <Grid
          container
          display={"flex"}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>{isUpdate ? "Edit User" : "Add User"}</Grid>
          <Grid item>
            <IconButton aria-label="close" onClick={handleCloseModal}>
              <X />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          name="name"
          value={state.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="phone"
          label="Phone"
          type="text"
          fullWidth
          name="phone"
          value={state.phone}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        {!isUpdate && (
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            name="password"
            value={state.password}
            onChange={handleChange}
          />
        )}
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
