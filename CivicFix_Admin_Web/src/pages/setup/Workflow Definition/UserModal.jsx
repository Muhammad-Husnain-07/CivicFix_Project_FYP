import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import { InputLabel } from "@mui/material";

const users = [
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" },
  { id: 3, name: "User 3" },
  { id: 4, name: "User 4" },
  { id: 5, name: "User 5" },
];

const UserModal = ({ show, setShow }) => {
  const [stepName, setStepName] = useState("");
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [selectedAction, setSelectedAction] = useState("");

  const handleClose = () => {
    setShow(false);
  };

  const handleSave = () => {
    // Save the workflow name and description here
    setShow(false);
  };

  return (
    <Dialog open={show} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add User Step</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} my={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Step Name"
              value={stepName}
              onChange={(e) => setStepName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-multiple-chip-label">Recipients</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={selectedRecipients}
                onChange={(e) => setSelectedRecipients(e.target.value)}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Action Type</InputLabel>

              <Select
                fullWidth
                label="Action Type"
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
              >
                <MenuItem value="Review">Review</MenuItem>
                <MenuItem value="Approve">Approve</MenuItem>
                <MenuItem value="Reject">Reject</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;
