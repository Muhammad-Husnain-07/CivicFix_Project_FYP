import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"; // No Router here, only Routes and Route
import Dashboard from "./Dashboard/Dashboard";
import Sidebar from "./Sidebar/Sidebar";
import User from "./User Management/User";
import Team from "./Team Management/Team";
import Login from "./Login/Login";
import Complaint from "./Complaint/Complaint";

function App() {
  const [userRole, setUserRole] = useState(null); // State to track the user's role

  // Simulate user authentication (Replace with actual login logic)
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setUserRole(storedRole); // Retrieve role from local storage if available
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setUserRole(null);
  };

  return (
    <div className="App">
      <Routes>
        {/* Login Route */}
        <Route
          path="/"
          element={<Login setUserRole={setUserRole} />}
        />

        {/* Protected Routes */}
        {userRole && (
          <>
            {/* Dashboard Route (Only visible to superAdmin) */}
            {userRole === "superAdmin" && (
              <Route
                path="/Dashboard"
                element={
                  <>
                    <Sidebar userRole={userRole} />
                    <Dashboard />
                  </>
                }
              />
            )}

            {/* Complaint Route (Visible to both roles) */}
            <Route
              path="/complaint"
              element={
                <>
                  <Sidebar userRole={userRole} />
                  <Complaint />
                </>
              }
            />

            {/* Team Management Route (Only visible to subAdmin) */}
            {userRole === "subAdmin" && (
              <Route
                path="/team-management"
                element={
                  <>
                    <Sidebar userRole={userRole} />
                    <Team />
                  </>
                }
              />
            )}

            {/* User Management Route (Only visible to subAdmin) */}
            {userRole === "subAdmin" && (
              <Route
                path="/user-management"
                element={
                  <>
                    <Sidebar userRole={userRole} />
                    <User />
                  </>
                }
              />
            )}
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
