import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";

const LogicalBranchModal = ({ show, setShow }) => {
  const [leftStepName, setLeftStepName] = useState("");
  const [leftStepDescription, setLeftStepDescription] = useState("");
  const [rightStepName, setRightStepName] = useState("");
  const [rightStepDescription, setRightStepDescription] = useState("");

  const handleClose = () => {
    setShow(false);
  };

  const handleSave = () => {
    // Save the workflow name and description here
    setShow(false);
  };

  return (
    <Dialog open={show} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Logical Branch</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} my={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Left Step Name"
              value={leftStepName}
              onChange={(e) => setLeftStepName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Right Step Name"
              value={rightStepName}
              onChange={(e) => setRightStepName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Left Step Description"
              multiline
              rows={4}
              value={leftStepDescription}
              onChange={(e) => setLeftStepDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Right Step Description"
              multiline
              rows={4}
              value={rightStepDescription}
              onChange={(e) => setRightStepDescription(e.target.value)}
            />
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

export default LogicalBranchModal;

