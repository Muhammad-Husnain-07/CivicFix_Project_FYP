import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, FormControl, InputLabel, Typography } from "@mui/material";

const IntegrationModal = ({ show, setShow }) => {
  const [stepName, setStepName] = useState("");
  const [connectedSystem, setConnectedSystem] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [parameters, setParameters] = useState([]);
  const [isParameterEditable, setIsParameterEditable] = useState({});

  const handleClose = () => {
    setShow(false);
  };

  const handleSave = () => {
    // Save the workflow name and description here
    setShow(false);
  };

  const handleAddParameter = () => {
    setParameters([...parameters, { name: "", value: "", location: "" }]);
    setIsParameterEditable({
      ...isParameterEditable,
      [parameters.length]: true,
    });
  };

  const handleParameterChange = (index, key, value) => {
    const newParameters = [...parameters];
    newParameters[index][key] = value;
    setParameters(newParameters);
  };

  const handleEditParameter = (index) => {
    setIsParameterEditable({ ...isParameterEditable, [index]: true });
  };

  const handleSaveParameter = (index) => {
    setIsParameterEditable({ ...isParameterEditable, [index]: false });
  };
  
  return (
    <Dialog open={show} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Integration</DialogTitle>
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
            <FormControl fullWidth>
              <InputLabel id="connected-system-label">
                Connected System
              </InputLabel>
              <Select
                labelId="connected-system-label"
                value={connectedSystem}
                label="Connected System"
                onChange={(e) => setConnectedSystem(e.target.value)}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Salesforce">Complaint Management System</MenuItem>
                <MenuItem value="Hubspot">IM Database</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="end-point-label">End Point</InputLabel>
              <Select
                labelId="end-point-label"
                value={endPoint}
                label="End Point"
                onChange={(e) => setEndPoint(e.target.value)}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="API">/v1/API</MenuItem>
                <MenuItem value="Webhook">/v1/Webhook</MenuItem>
                <MenuItem value="Webhook">/v1/endpoint</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} mt={6}>
          <TableContainer>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography mr={1} sx={{ fontWeight: "bold" }} variant="h6">
                Parameters
              </Typography>
              <Button variant="contained" onClick={handleAddParameter}>
                Add Parameter
              </Button>
            </Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {parameters.map((row, index) =>
                  isParameterEditable[index] !== null &&
                  isParameterEditable[index] !== undefined ? (
                    <TableRow key={index}>
                      <TableCell>
                        {isParameterEditable[index] ? (
                          <TextField
                            fullWidth
                            value={row.name}
                            onChange={(e) =>
                              handleParameterChange(
                                index,
                                "name",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          row.name
                        )}
                      </TableCell>
                      <TableCell>
                        {isParameterEditable[index] ? (
                          <TextField
                            fullWidth
                            value={row.value}
                            onChange={(e) =>
                              handleParameterChange(
                                index,
                                "value",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          row.value
                        )}
                      </TableCell>
                      <TableCell>
                        {isParameterEditable[index] ? (
                          <TextField
                            fullWidth
                            value={row.location}
                            onChange={(e) =>
                              handleParameterChange(
                                index,
                                "location",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          row.location
                        )}
                      </TableCell>
                      <TableCell>
                        {isParameterEditable[index] !== null &&
                        isParameterEditable[index] !== undefined ? (
                          isParameterEditable[index] ? (
                            <Button
                              variant="contained"
                              onClick={() => handleSaveParameter(index)}
                            >
                              Save
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              onClick={() => handleEditParameter(index)}
                            >
                              Edit
                            </Button>
                          )
                        ) : null}
                      </TableCell>
                    </TableRow>
                  ) : null
                )}
              </TableBody>
            </Table>
          </TableContainer>
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

export default IntegrationModal;
