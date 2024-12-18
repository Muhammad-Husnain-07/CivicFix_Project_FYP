import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import axios from "axios";
import Loader from "../../../components/Loader";
import { green, red } from "@mui/material/colors";
import {
  Card as MuiCard,
  CardContent,
  CardHeader,
  IconButton,
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableHead,
  TableRow as MuiTableRow,
  Typography,
  Box,
} from "@mui/material";
import { spacing } from "@mui/system";

const Card = styled(MuiCard)(spacing);

const TableRow = styled(MuiTableRow)`
  height: 42px;
`;

const TableCell = styled(MuiTableCell)`
  padding-top: 0;
  padding-bottom: 0;
`;

const GreenText = styled.span`
  color: ${() => green[400]};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const RedText = styled.span`
  color: ${() => red[400]};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const MiniTable = ({ theme, filter }) => {
  const [sourcesData, setSourcesData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // const url =
        //   "https://resolvex-api.graymushroom-01823765.uksouth.azurecontainerapps.io/api/charts/dispute-sources";
        // const response = await axios.post(url, { timeframe: filter });

        if (
          true ||
          {
            /*response.status === 200 */
          }
        ) {
          setSourcesData([
            {
              source: "LESCO",
              count: 350,
            },
            {
              source: "SNGPL",
              count: 250,
            },
          ]);
          setLoading(false);
        }
        // else {
        //   setLoading(false);
        //   setSourcesData([]);
        // }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [filter]);

  return (
    <>
      <Card mb={6}>
        <CardHeader title="Complaints by Source" />

        <CardContent>
          {loading ? (
            <Loader />
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Source</TableCell>
                  <TableCell align="right">Complaints</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sourcesData?.map((item) => (
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {item?.source}
                    </TableCell>
                    <TableCell align="right">{item.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default withTheme(MiniTable);
