import React from "react";
import { Stepper, Step, StepLabel, Box } from "@mui/material";

const steps = [
  "Initiate",
  "Team Assigned",
  "Investigate",
  "Resolution",
  "Approval/Rejection",
  "Route/Post",
];

function StepperComponent() {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={2} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default StepperComponent;
