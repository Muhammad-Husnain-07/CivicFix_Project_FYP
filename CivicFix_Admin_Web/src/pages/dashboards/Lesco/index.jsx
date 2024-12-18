import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
  Box as MuiBox,
  Card as MuiCard,
  CardContent,
} from "@mui/material";
import { spacing } from "@mui/system";
import { green, red } from "@mui/material/colors";
import Actions from "./Actions";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import Stats from "./Stats";
import Table from "./Table";
import MiniTable from "./MiniTable";
import PieChart from "./PieChart";
import MultiAxisLineChart from "./MultiAxisLineChart";
import MapComponent from "./MapComponent";
import axios from "axios";
import Loader from "../../../components/Loader";
import StackedBarChart from "./StackedBarChart";

const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);

const TotalCard = styled(MuiCard)(spacing);
`
  text-align: center;
  background-color: ${(props) => rgba(props.theme.palette.primary.main, 0.25)};
  color: ${(props) => props.theme.palette.primary.main};
`;

function Lesco({ theme }) {
  const [filter, setFilter] = useState({
    label: "Last 7 Days",
    value: "last7days",
  });
  const [statsData, setStatsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const url = `https://resolvex-api.graymushroom-01823765.uksouth.azurecontainerapps.io/api/charts/disputes-stats`;
        //const response = await axios.post(url, { timeframe: filter.value });
        //const allStats = response.data;
        setStatsData([
          {
            title: "Reported",
            count: 91,
            chip: filter?.value,
            percentagetext: "0%",
          },
          {
            title: "In Progress",
            count: 117,
            chip: filter?.value,
            percentagetext: "0%",
          },
          {
            title: "Resolved",
            count: 26,
            chip: filter?.value,
            percentagetext: "0%",
          },
          {
            title: "Closed",
            count: 64,
            chip: filter?.value,
            percentagetext: "0%",
          },
        ]);
      } catch (error) {
        setStatsData([]);
        console.error("Error fetching the chart data", error);
      }
    };

    fetchData();
  }, [filter, theme]);
  return (
    <React.Fragment>
      <Helmet title="Lesco Dashboard" />
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            LESCO Dashboard
          </Typography>
        </Grid>
        <Grid item>
          <Actions filter={filter} setFilter={setFilter} />
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6} mb={6}>
        {statsData ? (
          <>
            {statsData.map((item, index) => (
              <Grid key={index} item xs={12} sm={12} md={3} lg={3} xl={3}>
                <Stats
                  title={item.title}
                  amount={item.count ? item.count : "-"}
                  chip={
                    filter?.value === item.chip
                      ? filter?.label
                      : item.chip ?? "-"
                  }
                  percentagetext={item.percentagetext}
                  percentagecolor={
                    item.percentagetext?.includes("-") ? red[500] : green[500]
                  }
                />
              </Grid>
            ))}
          </>
        ) : (
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Loader />
          </Grid>
        )}
      </Grid>
      <Grid container spacing={6} mb={6}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <StackedBarChart filter={filter?.value} />
        </Grid>
      </Grid>
      <Grid container spacing={6} mb={10}>
        {/* <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
          <MiniTable filter={filter?.value} />
        </Grid> */}
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
          <PieChart filter={filter?.value} />
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
          <MultiAxisLineChart />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Lesco;
