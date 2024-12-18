import React, { useState } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import {
  Typography as MuiTypography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TextField,
  Button,
  Card,
  CardHeader,
  TablePagination,
  TableContainer,
} from "@mui/material";
import { PlusIcon, Trash } from "lucide-react";
import DataSourceDefinition from "./DataSourceDefinitionTable";
const TopAlignedTableCell = styled(TableCell)`
  vertical-align: top;
`;

const IconButton = styled(Button)`
  padding: 10;
  margin-inline: 5;
  min-width: 0;

  svg {
    width: 18px;
    height: 18px;
  }
`;
const DataSourceDefinitionTable = () => {
  const [dataSourceDefinition, setDataSourceDefinition] = useState([
    {
      category: "ATM",
      sources: [
        { name: "EJ", address: "EJM\\EJ01252024\\" },
        { name: "Base24", address: "EJM\\EJ01252025\\" },
        { name: "T24 - TLog", address: "EJM\\EJ01252026\\" },
        { name: "Cash CIT", address: "EJM\\EJ01252027\\" },
      ],
    },
    {
      category: "ISSUER",
      sources: [
        { name: "VISA Debit", address: "NI\\MC\\Credit\\Base1" },
        { name: "VISA Credit", address: "NI\\MC\\Credit\\Base2" },
        { name: "Master Card Debit", address: "NI\\MC\\Credit\\Base3" },
        { name: "Master Card Credit", address: "NI\\MC\\Credit\\Base4" },
      ],
    },
    {
      category: "ACQUIRER",
      sources: [
        { name: "VISA Debit", address: "Fiserv\\Visa\\Debit\\" },
        { name: "VISA Credit", address: "Fiserv\\Visa\\Debit\\" },
        { name: "Master Card Debit", address: "Fiserv\\Visa\\Debit\\" },
        { name: "Master Card Credit", address: "Fiserv\\Visa\\Debit\\" },
      ],
    },
    {
      category: "Digital",
      sources: [
        { name: "T-Log", address: "Fiserv\\Visa\\Debit\\" },
        { name: "T-24", address: "" },
      ],
    },
    {
      category: "Branch",
      sources: [
        { name: "Visa Debit", address: "Fiserv\\Visa\\Debit\\" },
        { name: "Visa Credit", address: "Fiserv\\Visa\\Credit\\" },
      ],
    },
    {
      category: "POS",
      sources: [
        { name: "T-Log", address: "TLOG\\POS20020\\1252024\\" },
        { name: "Scheme", address: "TLOG\\POS20020\\1252024\\" },
        { name: "Issuer", address: "TLOG\\POS20020\\1252024\\" },
        { name: "Acquirer", address: "TLOG\\POS20020\\1252024\\" },
      ],
    },
  ]);

  const handleCategoryChange = (index, event) => {
    const newDataSourceDefinition = [...dataSourceDefinition];
    newDataSourceDefinition[index].category = event.target.value;
    setDataSourceDefinition(newDataSourceDefinition);
  };

  const handleSourceChange = (index, innerIndex, event) => {
    const { name, value } = event.target;
    const newDataSourceDefinition = [...dataSourceDefinition];
    newDataSourceDefinition[index].sources[innerIndex][name] = value;
    setDataSourceDefinition(newDataSourceDefinition);
  };

  const handleAddSource = (index) => {
    const newDataSourceDefinition = [...dataSourceDefinition];
    newDataSourceDefinition[index].sources.push({ name: "", address: "" });
    setDataSourceDefinition(newDataSourceDefinition);
  };

  const handleDeleteSource = (index, innerIndex) => {
    const newDataSourceDefinition = [...dataSourceDefinition];
    if (newDataSourceDefinition[index].sources.length === 1) {
      newDataSourceDefinition.splice(index, 1);
    } else {
      newDataSourceDefinition[index].sources.splice(innerIndex, 1);
    }
    setDataSourceDefinition(newDataSourceDefinition);
  };

  const handleAddCategory = () => {
    setDataSourceDefinition([
      { category: "", sources: [{ name: "", address: "" }] },
      ...dataSourceDefinition,
    ]);
  };
  return (
    <Card mb={6}>
      <CardHeader
        title="Data Source Definition"
        titleTypographyProps={{ variant: "h6" }}
        action={
          <Button
            variant="contained"
            startIcon={<PlusIcon />}
            onClick={() => handleAddCategory()}
          >
            Add Data Source
          </Button>
        }
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Source Name</TableCell>
              <TableCell>Source Address</TableCell>
              <TableCell>Add Source</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataSourceDefinition.map((row, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TopAlignedTableCell rowSpan={row.sources.length + 1}>
                    <TextField
                      name="category"
                      value={row.category}
                      onChange={(event) => handleCategoryChange(index, event)}
                      size="small"
                      variant="outlined"
                      fullWidth
                    />
                  </TopAlignedTableCell>
                </TableRow>
                {row.sources.map((source, innerIndex) => (
                  <TableRow key={innerIndex}>
                    <TableCell>
                      <TextField
                        name="name"
                        value={source.name}
                        onChange={(event) =>
                          handleSourceChange(index, innerIndex, event)
                        }
                        size="small"
                        variant="outlined"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="address"
                        value={source.address}
                        onChange={(event) =>
                          handleSourceChange(index, innerIndex, event)
                        }
                        size="small"
                        variant="outlined"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteSource(index, innerIndex)}
                      >
                        <Trash />
                      </IconButton>
                      {innerIndex === 0 && (
                        <IconButton
                          size="small"
                          onClick={() => handleAddSource(index)}
                        >
                          <PlusIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
        {/* <TablePagination
          component="div"
          count={dataSourceDefinition.length}
          rowsPerPage={10}
          rowsPerPageOptions={[10]}
        /> */}
      </TableContainer>
    </Card>
  );
};

export default DataSourceDefinitionTable;
