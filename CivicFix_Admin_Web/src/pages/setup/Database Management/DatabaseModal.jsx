import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { PlusCircleIcon } from "lucide-react";

const DatabaseModal = ({
  databases,
  openModal,
  handleCloseModal,
  newDatabase,
  setNewDatabase,
  handleAddDatabase,
}) => {
  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          p: 4,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add Database
        </Typography>
        <Grid container spacing={4} sx={{ my: 2 }}>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Select Database</InputLabel>
              <Select
                name="databases"
                label="Select Database"
                value={newDatabase[0]?.name || ""}
                onChange={(e) =>
                  setNewDatabase([{ name: e.target.value, tables: [] }])
                }
                fullWidth
              >
                {databases.map((database, index) => (
                  <MenuItem key={index} value={database.name}>
                    {database.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Select Table</InputLabel>
              <Select
                name="tables"
                label="Select Table"
                value={newDatabase[0]?.tables[0]?.name || ""}
                onChange={(e) =>
                  setNewDatabase((prevState) => [
                    {
                      name: prevState[0]?.name,
                      tables: [
                        {
                          name: e.target.value,
                          keys: databases
                            .find(
                              (database) =>
                                database.name === newDatabase[0]?.name
                            )
                            .tables.find(
                              (table) => table.name === e.target.value
                            ).keys,
                        },
                      ],
                    },
                  ])
                }
                fullWidth
                disabled={!newDatabase[0]?.name}
              >
                {databases
                  .find((database) => database.name === newDatabase[0]?.name)
                  ?.tables?.map((table, index) => (
                    <MenuItem key={index} value={table.name}>
                      {table.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button variant="contained" onClick={handleAddDatabase}>
          Add Database
        </Button>
      </Box>
    </Modal>
  );
};

export default DatabaseModal;
