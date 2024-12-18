import React from "react";
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

const UserModal = ({ openModal, handleCloseModal }) => {
  const [state, setState] = React.useState({
    group: "",
    department: "",
    title: "",
    employeeId: "",
    region: "",
    location: "",
    name: "",
    supervisor: "",
    email: "",
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitForm = () => {
    handleClose();
  };

  return (
    <Dialog open={openModal} onClose={handleCloseModal}>
      <DialogTitle>
        <Grid
          container
          display={"flex"}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>Add User</Grid>
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
          id="group"
          label="Group"
          type="text"
          fullWidth
          name="group"
          value={state.group}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="department"
          label="Department"
          type="text"
          fullWidth
          name="department"
          value={state.department}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          name="title"
          value={state.title}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="employeeId"
          label="Employee ID"
          type="text"
          fullWidth
          name="employeeId"
          value={state.employeeId}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="region"
          label="Region"
          type="text"
          fullWidth
          name="region"
          value={state.region}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="location"
          label="Location"
          type="text"
          fullWidth
          name="location"
          value={state.location}
          onChange={handleChange}
        />
        <TextField
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
          id="supervisor"
          label="Supervisor"
          type="text"
          fullWidth
          name="supervisor"
          value={state.supervisor}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} variant="contained">
          Cancel
        </Button>
        <Button onClick={handleSubmitForm} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;
