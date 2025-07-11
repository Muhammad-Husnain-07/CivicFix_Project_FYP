import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  CssBaseline,
  Paper as MuiPaper,
  Container as MuiContainer,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { spacing } from "@mui/system";

import GlobalStyle from "../components/GlobalStyle";
import Navbar from "../components/navbar/Navbar";
import DashboardItems from "../components/sidebar/dashboardItems";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/Footer";
import Settings from "../components/Settings";
import addNotification from "react-push-notification";
import { SocketURL } from "../utils/urlBase";

const drawerWidth = 258;

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Drawer = styled.div`
  ${(props) => props.theme.breakpoints.up("md")} {
    width: ${drawerWidth}px;
    flex-shrink: 0;
  }
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

const Paper = styled(MuiPaper)(spacing);

const Container = styled(MuiContainer)`
  height: 100%;
`;

const MainContent = styled(Paper)`
  flex: 1;
  background: ${(props) => props.theme.palette.background.default};

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

const Dashboard = ({ children }) => {
   const navigate = useNavigate();
  const router = useLocation();
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Close mobile menu when navigation occurs
  useEffect(() => {
    setMobileOpen(false);
  }, [router.pathname]);

  const dashboardItems = DashboardItems();
  useEffect(() => {
    // Request permission to display notifications
    const requestPermission = async () => {
      const permission = await window.Notification.requestPermission();
      if (permission === "granted") {
        const ws = new WebSocket(SocketURL);

        ws.onmessage = (event) => {
          const data = JSON.parse(event.data)?.message;
          if (
            !data ||
            !data?.sub_admins?.includes(localStorage?.getItem("username"))
          ) {
            return;
          }

          addNotification({
            title: data?.title ?? "New Notification",
            message: data?.body ?? "You have a new notification.",
            icon: "./static/img/notification.png",
            duration: 5000,
            native: true, // when using native, your OS will handle theming.
            onClick: () => navigate(data?.link ?? "/"),
          });
        };

        return () => {
          ws.close();
        };
      }
    };

    requestPermission();
  }, []);

  return (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      <Drawer>
        <Box sx={{ display: { xs: "block", lg: "none" } }}>
          <Sidebar
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            items={dashboardItems}
          />
        </Box>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Sidebar
            PaperProps={{ style: { width: drawerWidth } }}
            items={dashboardItems}
          />
        </Box>
      </Drawer>
      <AppContent>
        <Navbar onDrawerToggle={handleDrawerToggle} />
        <MainContent p={isLgUp ? 12 : 5}>
          <Container maxWidth="xl">
            {children}
            <Outlet />
          </Container>
        </MainContent>
        <Footer />
      </AppContent>
      <Settings />
    </Root>
  );
};

export default Dashboard;
