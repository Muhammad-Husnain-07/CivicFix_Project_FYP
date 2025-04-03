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
  Stack,
  IconButton,
  CardActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import apiClient from "../../utils/axiosConfig";
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
            : value?.toLowerCase() === "resolved" || value?.toLowerCase() === "completed"
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
  const[complaint, setComplaint] = useState(null);
  const handleClose = () => {
    setOpen(false);
    setComplaint(null);
  };

  const getComplaint=(complaintId) =>{
    apiClient.get(`/complaints/${complaintId}`).then((response) => {
      if(response){
        setComplaint(response);
      }
    })
  }

useEffect(() => {
  if (selectedRow) {
    getComplaint(selectedRow.complaint_id);
  }
}, [selectedRow]);

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
         {!complaint ? <Loader/>: <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                {renderDetail("Complaint ID", complaint?.complaint_id)}
                {renderDetail("Department", complaint?.department)}
                {renderDetail("Reference Number", complaint?.ref_number)}
                {renderDetail("Category", complaint?.complaint_category)}
                {renderDetail("Type", complaint?.complaint_type)}
                {renderDetail("Details", complaint?.complaint_details)}
                {renderDetail("Date", new Date(complaint?.submission_date).toLocaleDateString())}
                {renderDetail("Status", complaint?.status, true)}
                {renderDetail(
                  "Resolved Status",
                  complaint?.resolved_status,
                  complaint?.resolved_status?true : false
                )}
                {renderDetail(
                  "Assigned Team",
                  teams?.find(
                    (team) => team.id === complaint?.assigned_team_id
                  )?.name || null
                )}
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
          </Grid>}
        </CardContent>
      </Card>
    </Modal>
  );
};

export default ComplaintDetails;
