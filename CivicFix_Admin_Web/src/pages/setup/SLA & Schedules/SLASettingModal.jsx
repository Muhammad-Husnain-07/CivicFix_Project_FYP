import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { X } from "lucide-react";

export const SLASettingModal = ({ openModal, handleCloseModal }) => {
  return (
    <Dialog open={openModal} onClose={handleCloseModal}>
      <DialogTitle>
        <Grid
          container
          display={"flex"}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>SLA Settings</Grid>
          <Grid item>
            <IconButton aria-label="close" onClick={handleCloseModal}>
              <X />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={4} sx={{ my: 2 }}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">SLA Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select SLA Type"
              >
                <MenuItem value={10}>Response Time SLA</MenuItem>
                <MenuItem value={20}>Resolution Time SLA</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Display Name"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Resource Type</FormLabel>
              <RadioGroup
                aria-label="Resource Type"
                name="Resource Type"
                sx={{ flexDirection: "row" }}
              >
                <FormControlLabel
                  value="Monitors"
                  control={<Radio />}
                  label="Monitor"
                />
                <FormControlLabel
                  value="Monitor Groups"
                  control={<Radio />}
                  label="Monitor Groups"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"></InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={10}>Application Load Balancer</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Business Hours
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={10}>Monday - Friday</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid container item xs={12} spacing={1}>
            <Grid item xs={4}>
              <TextField
                id="outlined-basic"
                label="SLA Goal"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item container xs={8} spacing={1}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label"></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={10}
                  >
                    <MenuItem value={10}>less than</MenuItem>
                    <MenuItem value={20}>more than</MenuItem>
                    <MenuItem value={30}>equal to</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="SLA Duration"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleCloseModal}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
