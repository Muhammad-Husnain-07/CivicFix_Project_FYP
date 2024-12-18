import React from "react";
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Divider as MuiDivider,
  styled,
} from "@mui/material";
import Workflow from "./Workflow";
import { spacing } from "@mui/system";

const steps = ["Upload", "Form", "Workflow", "Place Signature", "Permissions"];
const Divider = styled(MuiDivider)(spacing);
function WorkflowArea() {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" color="primary" sx={{ mr: 2 }}>
          Save
        </Button>
        <Button variant="contained" color="primary">
          Continue
        </Button>
      </Box>
      <Divider my={6} />
      <Box sx={{ width: "100%", mb: 7 }}>
        <Stepper activeStep={2} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box>
        <Workflow />
      </Box>
    </Box>
  );
}

export default WorkflowArea;
