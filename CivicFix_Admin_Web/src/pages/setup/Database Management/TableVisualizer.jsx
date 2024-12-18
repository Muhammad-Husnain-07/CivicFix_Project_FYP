// App.js
import React, { useEffect, useRef } from "react";
import { Container, Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/system";

const data = {
  tables: [
    {
      name: "Employee",
      keys: [
        { name: "EmployeeID", isPrimaryKey: true },
        { name: "FirstName" },
        { name: "LastName" },
        { name: "EMail" },
        { name: "Phone" },
        { name: "HireDate" },
        { name: "ManagerID" },
        { name: "Salary" },
        { name: "DepartmentID", isForeignKey: true },
        { name: "LastName" },
        { name: "EMail" },
        { name: "Phone" },
        { name: "HireDate" },
        { name: "ManagerID" },
        { name: "Salary" },
        { name: "DepartmentID", isForeignKey: true },
      ],
    },
    {
      name: "Department",
      keys: [
        { name: "DepartmentID", isPrimaryKey: true },
        { name: "DepartmentName" },
      ],
    },
    {
      name: "Department",
      keys: [
        { name: "DepartmentID", isPrimaryKey: true },
        { name: "DepartmentName" },
      ],
    },
    {
      name: "Department",
      keys: [
        { name: "DepartmentID", isPrimaryKey: true },
        { name: "DepartmentName" },
      ],
    },
  ],
};

const TableContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  width: "200px",
}));

const TableHeader = styled(Typography)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1.5),
  textAlign: "center",
  fontWeight: "bold",
}));

const Column = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0.5),
}));

const PK = styled("span")(({ theme }) => ({
  color: theme.palette.primary.main,
}));
const SK = styled("span")(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

const FK = styled("span")(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

const CustomTable = ({ table }) => (
  <TableContainer>
    <TableHeader variant="h6">{table.name}</TableHeader>
    {table.keys.map((key) => (
      <Column key={key.name}>
        <span>{key.name}</span>
        <span>
          {key.isPrimaryKey && <PK>PK</PK>}
          {key.isSecondaryKey && <SK>SK</SK>}
          {key.isForeignKey && <FK>FK</FK>}
        </span>
      </Column>
    ))}
  </TableContainer>
);

const TableVisualizer = ({ databases, linkedDB }) => {
  const data = {
    tables: databases.map((db) => {
      const data = db.tables.map((table) => {
        return {
          name: table.name,
          keys: table.keys.map((key) => {
            return {
              name: key,
              isPrimaryKey:
                linkedDB.find((dbInner) => dbInner.name === db.name)
                  ?.primaryKey === key
                  ? true
                  : false,
              isSecondaryKey:
                linkedDB.find((dbInner) => dbInner.name === db.name)
                  ?.secondaryKey === key
                  ? true
                  : false,
              isForeignKey:
                linkedDB.find((dbInner) => dbInner.name === db.name)
                  ?.otherKey === key
                  ? true
                  : false,
            };
          }),
        };
      });

      if (data.length > 0) {
        return data[0];
      }

      return null;
    }),
  };
  return (
    <Container
      style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
    >
      {data.tables.map((table) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            m: 1,
          }}
          key={table.name}
        >
          <CustomTable key={table.name} table={table} />
        </Box>
      ))}
    </Container>
  );
};

export default TableVisualizer;
