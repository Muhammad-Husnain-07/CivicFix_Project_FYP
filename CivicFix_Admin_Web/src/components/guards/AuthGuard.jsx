import React from "react";
import { Navigate } from "react-router-dom";


// For routes that can only be accessed by authenticated users
function AuthGuard({ children }) {


  return <React.Fragment>{children}</React.Fragment>;
}

export default AuthGuard;
