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
} from "@mui/material";
import { spacing } from "@mui/system";
import Actions from "./Actions";
import Stats from "./Stats";
import PieChart from "./PieChart";
import MultiAxisLineChart from "./MultiAxisLineChart";
import Loader from "../../../components/Loader";
import StackedBarChart from "./StackedBarChart";
import apiClient from "../../../utils/axiosConfig";
import MapComponent from "./MapComponent";
const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);

`
  text-align: center;
  background-color: ${(props) => rgba(props.theme.palette.primary.main, 0.25)};
  color: ${(props) => props.theme.palette.primary.main};
`;

function SNGPL({ theme }) {
  const [filter, setFilter] = useState({
    label: "Last 7 Days",
    value: "last7days",
  });
  const [statsData, setStatsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiClient(
          "/complaints/stats?filter=" + filter.value + "&department=SNGPL"
        );
        if (data) {
          setStatsData(data);
        }
      } catch (error) {
        setStatsData([]);
        console.error("Error fetching the chart data", error);
      }
    };

    fetchData();
  }, [filter, theme]);

  return (
    <React.Fragment>
      <Helmet title="SNGPL Dashboard" />
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            SNGPL Dashboard
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
            {statsData?.length > 0 && statsData?.map((item, index) => (
              <Grid key={index} item xs={12} sm={12} md={3} lg={3} xl={3}>
                <Stats
                  title={item.title}
                  amount={item.count ??  "-"}
                  chip={
                    filter?.value === item.chip
                      ? filter?.label
                      : item.chip ?? "-"
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
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
          <PieChart filter={filter?.value} />
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
          <MultiAxisLineChart />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <MapComponent filter={filter?.value} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default SNGPL;
