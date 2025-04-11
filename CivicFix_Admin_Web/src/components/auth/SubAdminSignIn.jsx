import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";

import {
  Alert as MuiAlert,
  Checkbox,
  FormControlLabel,
  Button as MuiButton,
  TextField as MuiTextField,
  Link,
  Typography as MuiTypography,
} from "@mui/material";
import { spacing } from "@mui/system";
import apiClient from "../../utils/axiosConfig";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Button = styled(MuiButton)(spacing);

const Centered = styled(MuiTypography)`
  text-align: center;
`;

const Typography = styled(MuiTypography)(spacing);

function SignIn() {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().max(255).required("Username is required"),
        password: Yup.string().max(255).required("Password is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const res = await apiClient.post("/subadmin/login", {
            username: values.username,
            password: values.password,
          });
          const response = res.data;
          localStorage.setItem("username", response.username);
          localStorage.setItem("role", response.role);
          localStorage.setItem("department", response.department);
          localStorage.setItem("access_token", response.access_token);
          localStorage.setItem("refresh_token", response.refresh_token);
          try {
            const res = await apiClient.get("/departments");
            if (res) {
              res?.find((department) => {
                if (department.department_name === response.department) {
                  localStorage.setItem(
                    "department_id",
                    department.department_id
                  );
                }
              });
            }
          } catch (error) {
            console.error("Error fetching data: ", error);
          }
          if (localStorage.getItem("department_id")) navigate("/dashboard");
        } catch (error) {
          const message = error?.response?.data?.message?.description|| "Something went wrong";

          setStatus({ success: false });
          setErrors({ submit: message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          {errors.submit && (
            <Alert mt={2} mb={3} severity="warning">
              {errors.submit}
            </Alert>
          )}
          <TextField
            type="text"
            name="username"
            label="Username"
            value={values.username}
            error={Boolean(touched.username && errors.username)}
            fullWidth
            helperText={touched.username && errors.username}
            onBlur={handleBlur}
            onChange={handleChange}
            my={2}
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            value={values.password}
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            onBlur={handleBlur}
            onChange={handleChange}
            my={2}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            mb={3}
          >
            Sign in
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/admin-sign-in")}
            mb={3}
          >
            Move to Admin Sign in page
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default SignIn;
