import React from "react";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md"; // Dashboard icon
import { FaFileAlt } from "react-icons/fa"; // Complaint icon
import { FiUsers } from "react-icons/fi"; // Team Management icon
import { AiOutlineUsergroupAdd } from "react-icons/ai"; // User Management icon
import { BiLogOut } from "react-icons/bi"; // Logout icon
import "./Sidebar.css";

function Sidebar({ userRole }) {
  // Define menus for each role with icons
  const superAdminMenu = [
    { name: "Dashboard", path: "/Dashboard", icon: <MdDashboard /> },
    { name: "Complaint", path: "/complaint", icon: <FaFileAlt /> },
  ];

  const subAdminMenu = [
    { name: "Complaint", path: "/complaint", icon: <FaFileAlt /> },
    { name: "Team Management", path: "/team-management", icon: <FiUsers /> },
    { name: "User Management", path: "/user-management", icon: <AiOutlineUsergroupAdd /> },
    { name: "Logout", path: "", icon: <BiLogOut /> },
  ];

  // Determine which menu to render based on the role
  const menuItems = userRole === "superAdmin" ? superAdminMenu : subAdminMenu;

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h1>CIVICFIX</h1>
      </div>
      <ul>
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink to={item.path}>
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-text">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
