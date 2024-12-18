import React, { useState } from "react";
import styled from "@emotion/styled";
import { Box as MuiBox, Grid } from "@mui/material";
import { spacing } from "@mui/system";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import MUIDataTable from "mui-datatables";
import { PencilIcon, Trash } from "lucide-react";

const Box = styled(MuiBox)(spacing);

const columns = [
  { name: "teamId", label: "Team Id" },
  { name: "teamName", label: "Team Name" },
  { name: "teamHead", label: "Team Head" },
  { name: "teamMembers", label: "Team Members" },
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

const data = Array.from({ length: 10 }).map((_, i) => ({
  teamId: i + 1,
  teamName: `Team ${i + 1}`,
  teamHead: `Head ${i + 1}`,
  teamMembers: `member${i + 1}@example.com`,
  action: i % 2 ? "Edit" : "Delete",
}));

const TeamTable = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const options = {
    filterType: "dropdown",
    selectableRowsHideCheckboxes: true,
    onSearchChange: handleSearchChange,
  };

  return (
    <Box>
      <MUIDataTable
        title={"Team Management"}
        data={data}
        columns={columns}
        options={options}
      />
    </Box>
  );
};

export default TeamTable;
