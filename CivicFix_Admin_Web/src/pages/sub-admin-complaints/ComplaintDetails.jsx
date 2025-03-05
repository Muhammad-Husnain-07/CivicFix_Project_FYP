import React, { useState } from "react";
import {
  Box,
  Grid,
  Modal,
  Typography,
  Chip,
  Divider,
  CardMedia,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  CardActions,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import apiClient from "../../utils/axiosConfig";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "16px",
  outline: "none",
};

const renderDetail = (label, value, isChip = false) => (
  <Stack direction="row" spacing={2} alignItems="center">
    <Typography variant="subtitle1" color="text.secondary">
      {label}:
    </Typography>
    {isChip ? (
      <Chip
        label={value}
        color={
          value?.toLowerCase() === "pending"
            ? "warning"
            : value?.toLowerCase() === "in_progress"
            ? "info"
            : value?.toLowerCase() === "resolved"
            ? "success"
            : "error"
        }
        variant="outlined"
        size="small"
      />
    ) : (
      <Typography variant="body1" fontWeight="bold">
        {value || "N/A"}
      </Typography>
    )}
  </Stack>
);

const ComplaintDetails = ({ selectedRow, open, setOpen, teams }) => {
  const [assignedTeamId, setAssignedTeamId] = useState(
    selectedRow?.assigned_team_id
  );
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setAssignedTeamId(event.target.value);
  };

  const handleAssign = async () => {
    setLoading(true);
    try {
      await apiClient.put(`/complaints/${selectedRow.complaint_id}/update/`, {
        assigned_team_id: assignedTeamId
          ? assignedTeamId
          : selectedRow.assigned_team_id || null,
        status: "pending",
        resolved_status: null,
      });
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Card sx={style}>
        <CardHeader
          title="Complaint Details"
          titleTypographyProps={{
            variant: "h5",
            textAlign: "center",
            fontWeight: "bold",
          }}
          action={
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          }
        />
        <Divider sx={{ my: 2 }} />
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Complaint Information
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                {renderDetail("Complaint ID", selectedRow.complaint_id)}
                {renderDetail("Department", selectedRow.department)}
                {renderDetail("Reference Number", selectedRow.ref_number)}
                {renderDetail("Category", selectedRow.complaint_category)}
                {renderDetail("Type", selectedRow.complaint_type)}
                {renderDetail("Details", selectedRow.complaint_details)}
                {renderDetail("Date", selectedRow.submission_date)}
                {renderDetail("Status", selectedRow.status, true)}
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <CardMedia
                component="img"
                image={`data:image/jpeg;base64,${selectedRow.upload_image}`}
                alt="Complaint Image"
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  boxShadow: 3,
                }}
              />
            </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" sx={{ mb: 2 }}>
            Assign Team
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <FormControl sx={{ m: 1, minWidth: 250 }}>
              <InputLabel id="assigned-team-label">Assign Team</InputLabel>
              <Select
                labelId="assigned-team-label"
                value={assignedTeamId}
                defaultValue={selectedRow.assigned_team_id}
                onChange={handleChange}
              >
                {teams.map((team) => (
                  <MenuItem key={team.id} value={team.id}>
                    {team.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <LoadingButton
              variant="contained"
              color="primary"
              onClick={handleAssign}
              loading={loading}
              sx={{ alignSelf: "center" }}
            >
              Assign Team
            </LoadingButton>
          </Box>
        </CardContent>
        <Divider sx={{ my: 2 }} />
        {/* <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Close
          </Button>
        </CardActions> */}
      </Card>
    </Modal>
  );
};

export default ComplaintDetails;
