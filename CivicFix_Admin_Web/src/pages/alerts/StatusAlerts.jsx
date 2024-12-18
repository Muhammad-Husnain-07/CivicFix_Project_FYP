import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  Card as MuiCard,
  CardHeader,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
} from "@mui/material";
import { spacing } from "@mui/system";
import { PencilIcon, Trash } from "lucide-react";

const Card = styled(MuiCard)(spacing);

const Paper = styled(MuiPaper)(spacing);

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)});
`;

function createData(owner, phoneNumber, dob) {
  return {
    owner,
    phoneNumber,
    dob,
  };
}

const rows = [
  createData("John Doe", "864-348-0485", "01/01/2023"),
  createData("Jane Doe", "864-348-0485", "02/01/2023"),
  createData("Bob Smith", "864-348-0485", "03/01/2023"),
  createData("Alice Johnson", "864-348-0485", "04/01/2023"),
  createData("Mike Williams", "864-348-0485", "05/01/2023"),
  createData("Sarah Brown", "864-348-0485", "06/01/2023"),
  createData("Emily Davis", "864-348-0485", "07/01/2023"),
];

const StatusAlerts = () => {
  return (
    <Card mb={6}>
      <CardHeader title="Status Alerts" />
      <Paper>
        <TableWrapper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Owners</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.owner}</TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell>{row.dob}</TableCell>
                  <TableCell>
                    {/*Edit and Delete Icon for Action*/}
                    <Grid container spacing={2}>
                      <Grid item>
                        <PencilIcon  size={18}/>
                      </Grid>
                      <Grid item>
                        <Trash size={18} />
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
      </Paper>
    </Card>
  );
};

export default StatusAlerts;
