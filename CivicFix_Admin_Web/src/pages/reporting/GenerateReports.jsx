import React from "react";
import { Typography, Button, TextField, Box, Modal, Fade } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
export const GenerateReports = ({
  openFiltersModal,
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo,
  handleGenerateReports,
  handleCloseFiltersModal,
}) => {
  return (
    <Modal
      open={openFiltersModal}
      onClose={handleCloseFiltersModal}
      closeAfterTransition
    >
      <Fade in={openFiltersModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
            Generate Reports
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date From"
              value={dateFrom}
              onChange={(newValue) => setDateFrom(newValue)}
              renderInput={(params) => <TextField {...params} />}
              sx={{
                width: "100%",
                mb: 4,
              }}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date To"
              value={dateTo}
              onChange={(newValue) => setDateTo(newValue)}
              renderInput={(params) => <TextField {...params} />}
              sx={{
                width: "100%",
                mb: 4,
              }}
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateReports}
          >
            Generate Reports
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};
