import React from "react";
import { useRoutes } from "react-router-dom";

import async from "./components/Async";

// All pages that rely on 3rd party components (other than MUI) are
// loaded asynchronously, to keep the initial JS bundle to a minimum size

// Layouts
import AuthLayout from "./layouts/Auth";
import ErrorLayout from "./layouts/Error";
import DashboardLayout from "./layouts/Dashboard";

// Auth components
import AdminSignIn from "./pages/auth/AdminSignIn";
import SubAdminSignIn from "./pages/auth/SubAdminSignIn";
import Page404 from "./pages/auth/Page404";

// Pages components
import Default from "./pages/dashboards/Default";
import AdminComplaints from "./pages/admin-complaints";
import TeamManagement from "./pages/team-management";
import Lesco from "./pages/dashboards/Lesco";
import SNGPL from "./pages/dashboards/SNGPL";
import SubAdminComplaints from "./pages/sub-admin-complaints";
import TeamMemberManagement from "./pages/team-member-management";

const getDashboardRoutes = (department) => [
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: department === "LESCO" ? <Lesco /> : <SNGPL />,
      },
    ],
  },
  {
    path: "complaints",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <SubAdminComplaints />,
      },
    ],
  },
  {
    path: "team-management",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <TeamManagement />,
      },
    ],
  },
  {
    path: "team-member-management",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <TeamMemberManagement />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorLayout />,
    children: [
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
];

const getAdminRoutes = () => [
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Default />,
      },
    ],
  },
  {
    path: "complaints",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <AdminComplaints />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorLayout />,
    children: [
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
];

const getAuthRoutes = () => [
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/admin-sign-in",
        element: <AdminSignIn />,
      },
      {
        path: "/sub-admin-sign-in",
        element: <SubAdminSignIn />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorLayout />,
    children: [
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
];

const RoutesComponent = () => {
  const access_token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");
  const department = localStorage.getItem("department");

  const routes = (() => {
    if (access_token) {
      return role === "admin" ? getAdminRoutes() : getDashboardRoutes(department);
    }
    return getAuthRoutes();
  })();

  return useRoutes(routes);
};

export default RoutesComponent;
