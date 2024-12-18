import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Divider as MuiDivider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import DatabaseModal from "./DatabaseModal";
import { PlusCircleIcon } from "lucide-react";
import { spacing, styled } from "@mui/system";
import TableVisualizer from "./TableVisualizer";

const Divider = styled(MuiDivider)(spacing);

export const DatabaseSection = () => {
  const [databases, setDatabases] = useState([
    {
      name: "DB1",
      tables: [
        {
          name: "Incident Management",
          keys: [
            "Reference Number",
            "Time",
            "Date",
            "Channel",
            "Dispute category",
            "Agent ID",
            "Customer",
            "First",
            "Last",
            "Email",
            "Contact",
            "Subcategory",
            "Transaction Ref",
            "Amount TX CCY",
            "Amount Card CCY",
            "Tx Date",
            "Criticality",
            "Resolution Mode",
            "Merchant",
            "Merchant City",
            "Merchant location",
            "Remarks",
            "Status",
            "Close date",
          ],
        },
      ],
    },
    {
      name: "DB2",
      tables: [
        {
          name: "Dispute Repository",
          keys: [
            "Channel",
            "Dispute category",
            "Subcategory",
            "Service Provider",
            "Date",
            "Approved",
          ],
        },
      ],
    },
    {
      name: "DB3",
      tables: [
        {
          name: "Dispute Resolution",
          keys: [
            "Channel",
            "Dispute category",
            "Subcategory",
            "Service Provider",
          ],
        },
      ],
    },
  ]);
  const [newDatabase, setNewDatabase] = useState([]);
  const [linkingDB, setLinkingDB] = useState([
    {
      name: "DB1",
      tables: [
        {
          name: "Incident Management",
          keys: [
            "Reference Number",
            "Time",
            "Date",
            "Channel",
            "Dispute category",
            "Agent ID",
            "Customer",
            "First",
            "Last",
            "Email",
            "Contact",
            "Subcategory",
            "Transaction Ref",
            "Amount TX CCY",
            "Amount Card CCY",
            "Tx Date",
            "Criticality",
            "Resolution Mode",
            "Merchant",
            "Merchant City",
            "Merchant location",
            "Remarks",
            "Status",
            "Close date",
          ],
        },
      ],
    },
  ]);
  const [linkedDB, setLinkedDB] = useState([
    {
      name: "DB1",
      primaryKey: "Channel",
      secondaryKey: "Reference Number",
      otherKey: "Date",
    },
  ]);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleAddDatabase = () => {
    setLinkingDB((prevState) => [...newDatabase, ...prevState]);
    setNewDatabase([]);
    handleCloseModal();
  };
  const handleLinking = (e, dbIndex) => {
    setLinkedDB((prevState) =>
      prevState.map((db, index) => {
        if (index === dbIndex) {
          return {
            ...db,
            [e.target.name]: e.target.value,
          };
        }
        return db;
      })
    );
  };
  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Button variant="contained" onClick={handleOpenModal}>
            Add Database
          </Button>
        </Grid>
        <Grid container xs={10} spacing={2} sx={{overflow:"auto",maxHeight:"300px" }}>
          {linkingDB.length > 0 &&
            linkedDB.length > 0 &&
            linkedDB.map((db, dbIndex) => (
              <Grid item container key={dbIndex} spacing={3}>
                <Grid item xs={3} display={"flex"} alignItems={"center"}>
                  {dbIndex === 0 && (
                    <IconButton
                      onClick={() => {
                        setLinkedDB((prevState) => [
                          ...prevState,
                          {
                            name: "",
                            primaryKey: "",
                            secondaryKey: "",
                            otherKey: "",
                          },
                        ]);
                      }}
                      sx={{ mr: 1 }}
                    >
                      <PlusCircleIcon />
                    </IconButton>
                  )}
                  <FormControl
                    variant="outlined"
                    fullWidth
                    sx={{ width: "100%", ml: dbIndex === 0 ? 0 : 11 }}
                  >
                    <InputLabel>Select Database</InputLabel>
                    <Select
                      label="Select Database"
                      name="name"
                      value={db.name}
                      onChange={(e) => handleLinking(e, dbIndex)}
                      sx={{ width: "100%" }}
                    >
                      <MenuItem value="">
                        <em>Select Database</em>
                      </MenuItem>
                      {linkingDB.map((db) => (
                        <MenuItem key={db.name} value={db.name}>
                          {db.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {db.name && (
                  <>
                    {" "}
                    <Grid item xs={3}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel>Select Primary Key</InputLabel>
                        <Select
                          label="Select Primary Key"
                          value={db?.primaryKey || ""}
                          name="primaryKey"
                          onChange={(e) => handleLinking(e, dbIndex)}
                        >
                          <MenuItem value="">
                            <em>Select Primary Key</em>
                          </MenuItem>
                          {linkingDB
                            .find((linkDB) => linkDB.name === db.name)
                            ?.tables[0].keys.map((key, index) => (
                              <MenuItem key={index} value={key}>
                                {key}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel>Select Secondary Key</InputLabel>
                        <Select
                          label="Select Secondary Key"
                          value={db?.secondaryKey || ""}
                          name="secondaryKey"
                          onChange={(e) => handleLinking(e, dbIndex)}
                        >
                          <MenuItem value="">
                            <em>Select Secondary Key</em>
                          </MenuItem>
                          {linkingDB
                            .find((linkDB) => linkDB.name === db.name)
                            ?.tables[0].keys.map((key, index) => (
                              <MenuItem key={index} value={key}>
                                {key}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel>Select Other Key</InputLabel>
                        <Select
                          label="Select Other Key"
                          value={db?.otherKey || ""}
                          name="otherKey"
                          onChange={(e) => handleLinking(e, dbIndex)}
                        >
                          <MenuItem value="">
                            <em>Select Other Key</em>
                          </MenuItem>
                          {linkingDB
                            .find((linkDB) => linkDB.name === db.name)
                            ?.tables[0].keys.map((key, index) => (
                              <MenuItem key={index} value={key}>
                                {key}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </>
                )}
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Divider my={4} />
      <Grid container>
        <Grid item xs={12}>
          <TableVisualizer databases={linkingDB} linkedDB={linkedDB} />
        </Grid>
      </Grid>
      <DatabaseModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        databases={databases}
        newDatabase={newDatabase}
        setNewDatabase={setNewDatabase}
        handleAddDatabase={handleAddDatabase}
      />
    </Box>
  );
};
