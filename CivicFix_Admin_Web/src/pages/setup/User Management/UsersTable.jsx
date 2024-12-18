import React, { useState } from "react";
import styled from "@emotion/styled";
import { Box as MuiBox, Grid } from "@mui/material";
import { spacing } from "@mui/system";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import MUIDataTable from "mui-datatables";
import { PencilIcon, Trash } from "lucide-react";

const Box = styled(MuiBox)(spacing);

const columns = [
  { name: "group", label: "Group" },
  { name: "department", label: "Department" },
  { name: "title", label: "Title" },
  { name: "employeeId", label: "Employee ID" },
  { name: "region", label: "Region" },
  { name: "location", label: "Location" },
  { name: "name", label: "Name" },
  { name: "supervisor", label: "Supervisor" },
  { name: "email", label: "Email" },
  {
    name: "action",
    label: "Action",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => (
        <Grid container spacing={2} wrap="nowrap">
          <Grid item>
            <PencilIcon size={18} />
          </Grid>
          <Grid item>
            <Trash size={18} />
          </Grid>
        </Grid>
      ),
    },
  },
];

const createData = (
  group,
  department,
  title,
  employeeId,
  region,
  location,
  name,
  supervisor,
  email
) => {
  return {
    group,
    department,
    title,
    employeeId,
    region,
    location,
    name,
    supervisor,
    email,
  };
};

const data = [
  createData(
    "Admin",
    "Finance & Administration",
    "Vendor Management",
    "OPS001276",
    "Central",
    "Central Region HO",
    "Adam, Shin",
    "-",
    "-"
  ),
  createData(
    "Business",
    "Retail Banking",
    "Retail Banking AVP",
    "OPS001276",
    "Central",
    "Central Region HO",
    "Karim, Khan",
    "-",
    "-"
  ),
  createData(
    "Cash Management",
    "Treasury",
    "Cash Ops VP",
    "OPS001276",
    "Central",
    "Head Office",
    "Charles, K.S",
    "-",
    "-"
  ),
  createData(
    "CiT",
    "Cash Vendor",
    "Replenishment Head",
    "CIT001276",
    "External",
    "CiT – South",
    "Numen, Kim",
    "-",
    "-"
  ),
  createData(
    "IT Ops",
    "Information Technology",
    "IT Operation Manager",
    "OPS001276",
    "North",
    "North Region HO",
    "Akram, D.J",
    "-",
    "-"
  ),
  createData(
    "IT Ops",
    "Information Technology",
    "System Administrator",
    "OPS001276",
    "Central",
    "Central Region HO",
    "Hani, Jeoff",
    "-",
    "-"
  ),
  createData(
    "Operations",
    "Operations",
    "Operation Manager",
    "OPS001276",
    "Central",
    "Head Office",
    "John, Ken",
    "-",
    "-"
  ),
  createData(
    "Operations",
    "Operations",
    "Operation Supervisor",
    "OPS001276",
    "South",
    "South Region HO",
    "Staffie, Hek",
    "-",
    "-"
  ),
];

const UsersTable = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const options = {
    filterType: "dropdown",
    selectableRowsHideCheckboxes: true,
    onSearchChange: handleSearchChange,
  };

  return (
    <Box>
      <MUIDataTable
        title={"Users Management"}
        data={data}
        columns={columns}
        options={options}
      />
    </Box>
  );
};

export default UsersTable;
