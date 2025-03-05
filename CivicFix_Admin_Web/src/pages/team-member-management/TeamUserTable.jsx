import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Box as MuiBox, Grid } from "@mui/material";
import { spacing } from "@mui/system";
import MUIDataTable from "mui-datatables";
import { PencilIcon, Trash } from "lucide-react";

const Box = styled(MuiBox)(spacing);

const TeamTable = ({ data, setRowData, setOpenModal }) => {

  const columns = [
    { name: "id", label: "ID" },
    { name: "name", label: "Name" },
    { name: "phone", label: "Phone" },
    { name: "email", label: "Email" },
    {
      name: "action",
      label: "Action",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <Grid container spacing={2} wrap="nowrap">
            <Grid item>
              <PencilIcon
                onClick={() => {setRowData(data[tableMeta.rowIndex]); setOpenModal(true);}}
                size={18}
              />
            </Grid>
            {/* <Grid item>
              <Trash size={18} />
            </Grid> */}
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
