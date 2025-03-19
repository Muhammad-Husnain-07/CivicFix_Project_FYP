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
  Stack,
  IconButton,
  CardActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
                {renderDetail(
                  "Resolved Status",
                  selectedRow.resolved_status,
                  selectedRow.resolved_status?true : false
                )}
                {renderDetail(
                  "Assigned Team",
                  teams?.find(
                    (team) => team.id === selectedRow.assigned_team_id
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
                image={`data:image/jpeg;base64,${selectedRow.upload_image}`}
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
          </Grid>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default ComplaintDetails;
