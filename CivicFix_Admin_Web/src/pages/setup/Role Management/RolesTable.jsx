import React, { useState } from "react";
import styled from "@emotion/styled";
import { spacing } from "@mui/system";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Card,
  CardHeader,
  Button as MuiButton,
  Grid
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const Button = styled(MuiButton)(spacing);

const initialPermissions = [
  {
    permission: "Disputes Menu",
    roles: {
      "Branch Ops Lead": true,
      "Branch Ops": true,
      "Management Team": false,
      "Dev Ops": true,
      Administrator: true,
      "Security Administrator": true,
      "Support Serv": true,
    },
  },
  {
    permission: "Investigation Menu",
    roles: {
      "Branch Ops Lead": true,
      "Branch Ops": true,
      "Management Team": false,
      "Dev Ops": true,
      Administrator: true,
      "Security Administrator": true,
      "Support Serv": true,
    },
  },
  {
    permission: "Get Disputes",
    roles: {
      "Branch Ops Lead": true,
      "Branch Ops": true,
      "Management Team": false,
      "Dev Ops": true,
      Administrator: true,
      "Security Administrator": true,
      "Support Serv": true,
    },
  },
  {
    permission: "Get Dispute Details",
    roles: {
      "Branch Ops Lead": true,
      "Branch Ops": true,
      "Management Team": false,
      "Dev Ops": true,
      Administrator: true,
      "Security Administrator": true,
      "Support Serv": true,
    },
  },
  {
    permission: "Get Dispute Status",
    roles: {
      "Branch Ops Lead": true,
      "Branch Ops": true,
      "Management Team": false,
      "Dev Ops": true,
      Administrator: true,
      "Security Administrator": true,
      "Support Serv": true,
    },
  },
  {
    permission: "Summary Dashboard Menu",
    roles: {
      "Branch Ops Lead": true,
      "Branch Ops": true,
      "Management Team": false,
      "Dev Ops": true,
      Administrator: true,
      "Security Administrator": false,
      "Support Serv": true,
    },
  },
];

const RolesTable = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [permissions, setPermissions] = useState(initialPermissions);

  const togglePermission = (permIndex, role) => {
    const newPermissions = [...permissions];
    newPermissions[permIndex].roles[role] =
      !newPermissions[permIndex].roles[role];
    setPermissions(newPermissions);
  };

  return (
    <Card mb={6}>
      <CardHeader title="Role Management" action={<Grid container>
        <Grid item>
          <Button mr={2} variant="contained" color="primary" onClick={() => setIsEdit(!isEdit)}>
            {!isEdit?"Edit":"Save"} 
          </Button>
        </Grid>
      </Grid>}/>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Permissions</TableCell>
              {Object.keys(permissions[0].roles).map((role) => (
                <TableCell key={role}>{role}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {permissions.map((perm, permIndex) => (
              <TableRow key={perm.permission}>
                <TableCell>{perm.permission}</TableCell>
                {Object.entries(perm.roles).map(([role, isAllowed]) => (
                  <TableCell key={role} style={isEdit ? {} : { pointerEvents: 'none', opacity: 0.5 }}>
                    <IconButton
                      onClick={() => isEdit ? togglePermission(permIndex, role) : null}
                    >
                      {isAllowed ? (
                        <CheckCircleIcon color={"success"}/>
                      ) : (
                        <CancelIcon color={"error"}/>
                      )}
                    </IconButton>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default RolesTable;
