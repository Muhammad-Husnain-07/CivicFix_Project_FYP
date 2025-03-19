import React from "react";
import { createRoot } from "react-dom/client";
import { Snackbar, Alert } from "@mui/material";
import { CheckCircle, Info, Warning, Error } from "@mui/icons-material";

const Toast = (message, type = "info") => {
  // Create a container div for the toast
  const div = document.createElement("div");
  document.body.appendChild(div);

  // Create a React root using createRoot from react-dom/client
  const root = createRoot(div);

  // Function to unmount and remove the div after the toast is closed
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    root.unmount();
    div.remove();
  };
  root.render(
    <Snackbar
      open={true}
      autoHideDuration={7000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        iconMapping={{
          success: <CheckCircle />,
          warning: <Warning />,
          error: <Error />,
          info: <Info />,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
