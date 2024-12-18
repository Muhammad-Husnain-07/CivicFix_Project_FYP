import {
  BookOpen,
  Briefcase,
  Calendar,
  CheckSquare,
  CreditCard,
  Grid,
  Heart,
  Layout,
  List,
  Map,
  ShoppingCart,
  Package,
  PieChart,
  Sliders,
  Users,
  LayoutDashboard,
  UserSearch,
  TriangleAlert,
  FileBadge,
  UserRoundSearch,
  Search,
  Receipt,
  FileSpreadsheet,
  Settings,
  CircleHelp,
  Radar,
  BarChart,
} from "lucide-react";

const pagesSection = [
  {
    href: "/dashboard/default",
    icon: LayoutDashboard,
    title: "Summary Dashboard",
  },
  {
    href: "/dashboard/lesco",
    icon: PieChart,
    title: "LESCO Dashboard",
  },
  {
    href: "/dashboard/sngpl",
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
  // {
  //   href: "/user-management",
  //   icon: UserSearch,
  //   title: "User Management",
  // },
];
// const pagesSection = [
//   {
//     href: "/dashboard/default",
//     icon: LayoutDashboard,
//     title: "Summary Dashboard",
//   },
//   {
//     href: "/disputes",
//     icon: UserSearch,
//     title: "Disputes",
//   },

//   {
//     href: "/alerts",
//     icon: TriangleAlert,
//     title: "Alerts",
//   },
//   {
//     href: "/incident-management",
//     icon: FileBadge,
//     title: "Incident Management",
//   },
//   {
//     href: "/investigation",
//     icon: UserRoundSearch,
//     title: "Investigation",
//   },
//   {
//     href: "/smart-detect",
//     icon: Radar,
//     title: "Smart Detect",
//   },
//   // {
//   //   href: "/billing",
//   //   icon: Receipt,
//   //   title: "Billing",
//   // },
//   {
//     href: "/logs",
//     icon: List,
//     title: "Logs",
//   },
//   {
//     href: "/reporting",
//     icon: FileSpreadsheet,
//     title: "Reporting",
//   },
//   {
//     href: "/setup",
//     icon: Settings,
//     title: "Setup",
//     children: [
//       {
//         href: "/setup/role-management",
//         title: "Role Management",
//       },
//       {
//         href: "/setup/user-management",
//         title: "User Management",
//       },
//       {
//         href: "/setup/data-source-management",
//         title: "Data Source Management",
//       },
//       {
//         href: "/setup/database-management",
//         title: "Database Management",
//       },
//       {
//         href: "/setup/workflow-definition",
//         title: "Workflow Definition",
//       },
//       {
//         href: "/setup/sla-schedules",
//         title: "SLA & Schedules",
//       },
//       {
//         href: "/setup/configurator",
//         title: "Configurator",
//       },
//       {
//         href: "/setup/messaging",
//         title: "Messaging",
//       },
//     ],
//   },
//   {
//     href: "/help",
//     icon: CircleHelp,
//     title: "Help",
//   },
//   // {
//   //   href: "/dashboard",
//   //   icon: Sliders,
//   //   title: "Dashboard",
//   //   children: [
//   //     {
//   //       href: "/dashboard/default",
//   //       title: "Default",
//   //     },
//   //     {
//   //       href: "/dashboard/analytics",
//   //       title: "Analytics",
//   //     },
//   //     {
//   //       href: "/dashboard/saas",
//   //       title: "SaaS",
//   //     },
//   //   ],
//   // },
//   // {
//   //   href: "/pages",
//   //   icon: Layout,
//   //   title: "Pages",
//   //   children: [
//   //     {
//   //       href: "/pages/profile",
//   //       title: "Profile",
//   //     },
//   //     {
//   //       href: "/pages/settings",
//   //       title: "Settings",
//   //     },
//   //     {
//   //       href: "/pages/pricing",
//   //       title: "Pricing",
//   //     },
//   //     {
//   //       href: "/pages/chat",
//   //       title: "Chat",
//   //     },
//   //     {
//   //       href: "/pages/blank",
//   //       title: "Blank Page",
//   //     },
//   //   ],
//   // },
//   // {
//   //   href: "/projects",
//   //   icon: Briefcase,
//   //   title: "Projects",
//   //   badge: "8",
//   // },
//   // {
//   //   href: "/orders",
//   //   icon: ShoppingCart,
//   //   title: "Orders",
//   // },
//   // {
//   //   href: "/products",
//   //   icon: Package,
//   //   title: "Products",
//   // },
//   // {
//   //   href: "/invoices",
//   //   icon: CreditCard,
//   //   title: "Invoices",
//   //   children: [
//   //     {
//   //       href: "/invoices",
//   //       title: "List",
//   //     },
//   //     {
//   //       href: "/invoices/detail",
//   //       title: "Detail",
//   //     },
//   //   ],
//   // },
//   // {
//   //   href: "/tasks",
//   //   icon: CheckSquare,
//   //   title: "Tasks",
//   //   badge: "17",
//   // },
//   // {
//   //   href: "/calendar",
//   //   icon: Calendar,
//   //   title: "Calendar",
//   // },
//   // {
//   //   href: "/auth",
//   //   icon: Users,
//   //   title: "Auth",
//   //   children: [
//   //     {
//   //       href: "/auth/sign-in",
//   //       title: "Sign In",
//   //     },
//   //     {
//   //       href: "/auth-cover/sign-in",
//   //       title: "Sign In Cover",
//   //     },
//   //     {
//   //       href: "/auth/sign-up",
//   //       title: "Sign Up",
//   //     },
//   //     {
//   //       href: "/auth-cover/sign-up",
//   //       title: "Sign Up Cover",
//   //     },
//   //     {
//   //       href: "/auth/reset-password",
//   //       title: "Reset Password",
//   //     },
//   //     {
//   //       href: "/auth-cover/reset-password",
//   //       title: "Reset Password Cover",
//   //     },
//   //     {
//   //       href: "/error/404",
//   //       title: "404 Page",
//   //     },
//   //     {
//   //       href: "/error/500",
//   //       title: "500 Page",
//   //     },
//   //   ],
//   // },
// ];

// const elementsSection = [
//   {
//     href: "/components",
//     icon: Grid,
//     title: "Components",
//     children: [
//       {
//         href: "/components/alerts",
//         title: "Alerts",
//       },
//       {
//         href: "/components/accordion",
//         title: "Accordion",
//       },
//       {
//         href: "/components/avatars",
//         title: "Avatars",
//       },
//       {
//         href: "/components/badges",
//         title: "Badges",
//       },
//       {
//         href: "/components/buttons",
//         title: "Buttons",
//       },
//       {
//         href: "/components/cards",
//         title: "Cards",
//       },
//       {
//         href: "/components/chips",
//         title: "Chips",
//       },
//       {
//         href: "/components/dialogs",
//         title: "Dialogs",
//       },
//       {
//         href: "/components/lists",
//         title: "Lists",
//       },
//       {
//         href: "/components/menus",
//         title: "Menus",
//       },
//       {
//         href: "/components/pagination",
//         title: "Pagination",
//       },
//       {
//         href: "/components/progress",
//         title: "Progress",
//       },
//       {
//         href: "/components/snackbars",
//         title: "Snackbars",
//       },
//       {
//         href: "/components/tooltips",
//         title: "Tooltips",
//       },
//     ],
//   },
//   {
//     href: "/charts",
//     icon: PieChart,
//     title: "Charts",
//     children: [
//       {
//         href: "/charts/chartjs",
//         title: "Chart.js",
//       },
//       {
//         href: "/charts/apexcharts",
//         title: "ApexCharts",
//       },
//     ],
//   },
//   {
//     href: "/forms",
//     icon: CheckSquare,
//     title: "Forms",
//     children: [
//       {
//         href: "/forms/pickers",
//         title: "Pickers",
//       },
//       {
//         href: "/forms/selection-controls",
//         title: "Selection Controls",
//       },
//       {
//         href: "/forms/selects",
//         title: "Selects",
//       },
//       {
//         href: "/forms/text-fields",
//         title: "Text Fields",
//       },
//       {
//         href: "/forms/editors",
//         title: "Editors",
//       },
//       {
//         href: "/forms/formik",
//         title: "Formik",
//       },
//     ],
//   },
//   {
//     href: "/tables",
//     icon: List,
//     title: "Tables",
//     children: [
//       {
//         href: "/tables/simple-table",
//         title: "Simple Table",
//       },
//       {
//         href: "/tables/advanced-table",
//         title: "Advanced Table",
//       },
//       {
//         href: "/tables/data-grid",
//         title: "Data Grid",
//       },
//     ],
//   },
//   {
//     href: "/icons",
//     icon: Heart,
//     title: "Icons",
//     children: [
//       {
//         href: "/icons/material-icons",
//         title: "Material Icons",
//       },
//       {
//         href: "/icons/lucide-icons",
//         title: "Lucide Icons",
//       },
//     ],
//   },
//   {
//     href: "/maps",
//     icon: Map,
//     title: "Maps",
//     children: [
//       {
//         href: "/maps/google-maps",
//         title: "Google Maps",
//       },
//       {
//         href: "/maps/vector-maps",
//         title: "Vector Maps",
//       },
//     ],
//   },
// ];

// const docsSection = [
//   {
//     href: "/documentation/welcome",
//     icon: BookOpen,
//     title: "Documentation",
//   },
//   {
//     href: "/changelog",
//     icon: List,
//     title: "Changelog",
//     badge: "v4.6.0",
//   },
// ];

const navItems = [
  {
    title: "",
    pages: pagesSection,
  },
  // {
  //   title: "Elements",
  //   pages: elementsSection,
  // },
  // {
  //   title: "Mira Pro",
  //   pages: docsSection,
  // },
];

export default navItems;
