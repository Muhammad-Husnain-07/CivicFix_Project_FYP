import { List, PieChart, Users, LayoutDashboard, BarChart } from "lucide-react";
import { useEffect, useState } from "react";

const getPagesSection = (role, department) => {
  if (role === "admin") {
    return [
      {
        href: "/dashboard",
        icon: LayoutDashboard,
        title: "Summary Dashboard",
      },
      {
        href: "/complaints",
        icon: List,
        title: "Complaints",
      },
    ];
  }

  if (department === "LESCO") {
    return [
      {
        href: "/dashboard",
        icon: LayoutDashboard,
        title: "LESCO Dashboard",
      },
      {
        href: "/complaints",
        icon: List,
        title: "Complaints",
      },
      {
        href: "/team-management",
        icon: Users,
        title: "Team Management",
      },
      {
        href: "/team-member-management",
        icon: Users,
        title: "Team Member Management",
      },
    ];
  }

  if (department === "SNGPL") {
    return [
      {
        href: "/dashboard",
        icon: BarChart,
        title: "SNGPL Dashboard",
      },
      {
        href: "/complaints",
        icon: List,
        title: "Complaints",
      },
      {
        href: "/team-management",
        icon: Users,
        title: "Team Management",
      },
      {
        href: "/team-member-management",
        icon: Users,
        title: "Team Member Management",
      },
    ];
  }

  return [];
};

const DashboardItems = () => {
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    setRole(localStorage.getItem("role"));
    setDepartment(localStorage.getItem("department"));
  }, []);

  const navItems = [
    {
      title: "",
      pages: getPagesSection(role, department),
    },
  ];

  return navItems;
};

export default DashboardItems;

