import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Box as MuiBox, Grid } from "@mui/material";
import { spacing } from "@mui/system";
import MUIDataTable from "mui-datatables";
import { PencilIcon, Trash } from "lucide-react";

const Box = styled(MuiBox)(spacing);

const TeamTable = ({ data, setRowData, setOpenModal }) => {

  const columns = [
    { name: "id", label: "ID", options: { filter: false, sort: true } },
    { name: "name", label: "Name", options: { filter: true, sort: true } },
    { name: "phone", label: "Phone", options: { filter: false, sort: true } },
    { name: "email", label: "Email", options: { filter: false, sort: true } },
    {
      name: "action",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Grid container spacing={2} wrap="nowrap">
            <Grid item>
              <PencilIcon
                onClick={() => { setRowData(data[tableMeta.rowIndex]); setOpenModal(true); }}
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
        }}
      />
    </Box>
  );
};

export default TeamTable;
