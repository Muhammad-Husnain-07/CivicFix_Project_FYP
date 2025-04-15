import React, { useEffect, useState } from "react";
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
  FormHelperText,
  Tabs,
  Tab,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import apiClient from "../../utils/axiosConfig";
import CloseIcon from "@mui/icons-material/Close";
import Toast from "../../components/snackbar/Toast";
import Loader from "../../components/Loader";

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
            : value?.toLowerCase() === "in progress"
            ? "info"
            : value?.toLowerCase() === "resolved" ||
              value?.toLowerCase() === "completed"
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

const ComplaintDetails = ({ selectedRow, open, setOpen, teams, fetchData }) => {
  const [complaint, setComplaint] = useState(null);
  const [proofDetails, setProofDetails] = useState(null);
  const [review, setReview] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [assignedTeamId, setAssignedTeamId] = useState(
    selectedRow?.assigned_team_id
  );
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setAssignedTeamId(event.target.value);
  };

  const handleAssign = async () => {
    if (!assignedTeamId) {
      Toast("Please select a team before assigning", "warning");
      return;
    }
    setLoading(true);
    try {
      await apiClient.put(`/complaints/${selectedRow.complaint_id}/update`, {
        assigned_team_id: assignedTeamId
          ? assignedTeamId
          : selectedRow.assigned_team_id || null,
        status: "PENDING",
        resolved_status: null,
      });
      setOpen(false);
      fetchData();
      Toast("Complaint assigned successfully", "success");
    } catch (error) {
      console.error(error);
      Toast("Failed to assign complaint", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setComplaint(null);
    setTabValue(0);
  };

  const getComplaint = (complaintId) => {
    apiClient.get(`/complaints/${complaintId}`).then((response) => {
      if (response) {
        setComplaint(response);
      }
    });
  };

  const getProofOfResolution = (complaintId) => {
    apiClient
      .get(`/get-proof-of-resolution?complaint_id=${complaintId}`)
      .then((response) => {
        if (response) {
          setProofDetails(response);
        }
      });
  };

  const getReview = (complaintId) => {
    apiClient
      .get(`/feedback/get?complaint_id=${complaintId}`)
      .then((response) => {
        if (response) {
          setReview(response);
        }
      });
  };

  useEffect(() => {
    if (selectedRow) {
      getComplaint(selectedRow.complaint_id);
      getProofOfResolution(selectedRow.complaint_id);
      getReview(selectedRow.complaint_id);
    }
  }, [selectedRow]);

  const handleTabChange = (event, newValue) => {
    if (newValue === 0) setTabValue(newValue);
    if (newValue === 1 && proofDetails?.hasOwnProperty("proof_description"))
      setTabValue(newValue);
    if (newValue === 2 && review?.hasOwnProperty("comment"))
      setTabValue(newValue);
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
          {!complaint ? (
            <Loader />
          ) : (
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  aria-label="basic tabs example"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab label="Complaint Details" />
                  <Tab
                    label="Proof of Resolution"
                    onClick={() => {
                      if (!proofDetails) {
                        Toast(
                          "Proof of Resolution has not been submitted by the assigned team.",
                          "warning"
                        );
                      }
                    }}
                  />
                  <Tab
                    label="User Feedback"
                    onClick={() => {
                      if (!review) {
                        Toast(
                          "User Feedback has not been submitted by the user.",
                          "warning"
                        );
                      }
                    }}
                  />
                </Tabs>
              </Grid>
              <Grid container item xs={12}>
                {tabValue === 0 && (
                  <>
                    <Grid item xs={12} md={6} lg={6}>
                      <Stack spacing={3}>
                        {renderDetail("Complaint ID", complaint?.complaint_id)}
                        {renderDetail("Department", complaint?.department)}
                        {renderDetail(
                          "Reference Number",
                          complaint?.ref_number
                        )}
                        {renderDetail(
                          "Category",
                          complaint?.complaint_category
                        )}
                        {renderDetail("Type", complaint?.complaint_type)}
                        {renderDetail("Details", complaint?.complaint_details)}
                        {renderDetail(
                          "Date",
                          new Date(
                            complaint?.submission_date
                          ).toLocaleDateString()
                        )}
                        {renderDetail("Status", complaint?.status, true)}
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
                        image={`data:image/jpeg;base64,${complaint?.image_url}`}
                        alt="Complaint Image"
                        sx={{
                          width: "100%",
                          height: "350px",
                          borderRadius: "8px",
                          boxShadow: 3,
                          objectFit: "contain",
                        }}
                      />
                    </Grid>
                    <Divider />

                    <Stack direction="column" spacing={6}>
                      <Typography variant="h6">Assign Team</Typography>
                      <Stack direction="row" spacing={2}>
                        <FormControl sx={{ m: 1, minWidth: 250 }}>
                          <InputLabel id="assigned-team-label">
                            Assign Team
                          </InputLabel>
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
                          {teams.length === 0 && (
                            <FormHelperText sx={{ color: "error.main" }}>
                              No teams available. Please create a team first.
                            </FormHelperText>
                          )}
                        </FormControl>

                        <LoadingButton
                          variant="contained"
                          color="primary"
                          onClick={handleAssign}
                          loading={loading}
                          sx={{ alignSelf: "center" }}
                          disabled={complaint?.status !== "PENDING"}
                        >
                          Assign Team
                        </LoadingButton>
                      </Stack>
                    </Stack>
                  </>
                )}
                {tabValue === 1 && (
                  <>
                    <Grid item xs={6}>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={3}
                        mb={2}
                      >
                        <Typography variant="h6" color="text.secondary">
                          Team Remarks:
                        </Typography>
                        <Typography variant="h6">
                          {proofDetails?.proof_description || "N/A"}
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle2" color="text.secondary">
                        Date:{" "}
                        {proofDetails?.date_uploaded
                          ? new Intl.DateTimeFormat("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            }).format(new Date(proofDetails?.date_uploaded))
                          : "N/A"}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <CardMedia
                        component="img"
                        image={`data:image/jpeg;base64,${proofDetails?.proof_image}`}
                        alt="Resolution Proof Image"
                        sx={{
                          width: "100%",
                          height: "350px",
                          borderRadius: "8px",
                          boxShadow: 3,
                          objectFit: "contain",
                        }}
                      />
                    </Grid>
                  </>
                )}
                {tabValue === 2 && (
                  <Stack spacing={3}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="h6" color={"text.secondary"}>
                        Rating:
                      </Typography>
                      {(review?.rating &&
                        [...Array(5)].map((_, index) => (
                          <Typography
                            key={index}
                            variant="h3"
                            color={
                              index < review?.rating ? "yellow" : "disabled"
                            }
                          >
                            ★
                          </Typography>
                        ))) ||
                        "N/A"}
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="h6" color="text.secondary">
                        Feedback:
                      </Typography>
                      <Typography variant="h6">
                        {review?.comment || "N/A"}
                      </Typography>
                    </Stack>
                    <Typography variant="subtitle2" color="text.secondary">
                      Date:{" "}
                      {review?.date
                        ? new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          }).format(new Date(review?.date))
                        : "N/A"}
                    </Typography>
                  </Stack>
                )}
              </Grid>
            </Grid>
          )}
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
