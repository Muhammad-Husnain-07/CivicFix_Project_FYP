import React from "react";
import { Navigate } from "react-router-dom";


// For routes that can only be accessed by unauthenticated users
function GuestGuard({ children }) {


  return <React.Fragment>{children}</React.Fragment>;
}

export default GuestGuard;
