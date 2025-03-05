import React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";

import { Avatar, Typography } from "@mui/material";

import SignInComponent from "../../components/auth/AdminSignIn";

const BigAvatar = styled(Avatar)`
  width: 92px;
  height: 92px;
  text-align: center;
  margin: 0 auto ${(props) => props.theme.spacing(5)};
`;

function AdminSignIn() {
  return (
    <React.Fragment>
      <Helmet title="Sign In" />
      <Typography component="h1" variant="h3" align="center" gutterBottom>
        CivicFix Admin Panel
      </Typography>
      <Typography component="h2" variant="subtitle1" align="center">
        Sign in to your account to continue
      </Typography>

      <SignInComponent />
    </React.Fragment>
  );
}

export default AdminSignIn;
