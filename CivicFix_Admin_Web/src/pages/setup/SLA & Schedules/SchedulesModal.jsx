import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { X } from "lucide-react";

const SchedulesModal = ({ openModal, handleCloseModal }) => {
  const [formData, setFormData] = useState({
    jobName: "",
    description: "",
    frequency: "",
    status: "",
    startDate: null,
    endDate: null,
    startTime: null,
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStartDateChange = (date) => {
    setFormData({ ...formData, startDate: date });
  };

  const handleEndDateChange = (date) => {
    setFormData({ ...formData, endDate: date });
  };

  const handleStartTimeChange = (time) => {
    setFormData({ ...formData, startTime: time });
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
          <Grid item>Add Job</Grid>
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
              id="jobName"
              name="jobName"
              label="Job Name"
              variant="outlined"
              fullWidth
              value={formData.jobName}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              name="description"
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={formData.description}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="frequency-label">Frequency</InputLabel>
              <Select
                labelId="frequency-label"
                id="frequency"
                name="frequency"
                variant="outlined"
                value={formData.frequency}
                onChange={handleFormChange}
              >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="dayOfWeek">Day of the Week</MenuItem>
                <MenuItem value="particularDate">Particular Date</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                name="status"
                variant="outlined"
                value={formData.status}
                onChange={handleFormChange}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={formData.startDate}
                onChange={handleStartDateChange}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="End Date"
                value={formData.endDate}
                onChange={handleEndDateChange}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Start Time"
                value={formData.startTime}
                onChange={handleStartTimeChange}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SchedulesModal;
