import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Box as MuiBox, Grid, Chip } from "@mui/material";
import { spacing } from "@mui/system";
import MUIDataTable from "mui-datatables";
import { PencilIcon, Trash } from "lucide-react";

const Box = styled(MuiBox)(spacing);

const TeamTable = ({ data, setRowData, setOpenModal, users }) => {
  const columns = [
    { name: "id", label: "ID", options: { filter: false, sort: false } },
    { name: "name", label: "Name", options: { filter: false, sort: false } },
    {
      name: "team_members",
      label: "Team Members",
      options: {
        filter: false,
        customBodyRender: (value) =>
          value?.map((user) => (
            <Chip
              key={user}
              variant="outlined"
              color="secondary"
              style={{ marginRight: 5, borderRadius: 15 }}
              label={users?.find((u) => u.id === user)?.name}
            />
          )),
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Grid
            container
            spacing={2}
            style={{ cursor: "pointer", display: "flex", alignItems: "center" ,paddingLeft: 15}}
          >
            <Grid item>
              <PencilIcon
                onClick={() => {
                  setRowData(data[tableMeta.rowIndex]);
                  setOpenModal(true);
                }}
                size={18}
              />
            </Grid>
          </Grid>
        ),
      },
    },
  ];

  return (
    <Box>
      <MUIDataTable
        title={"Team Management"}
        data={data || []}
        columns={columns}
        options={{
          filterType: "dropdown",
          selectableRowsHideCheckboxes: true,
          textLabels: {
            body: {
              noMatch: "No teams found",
            },
          },
        }}
      />
    </Box>
  );
};

export default TeamTable;

