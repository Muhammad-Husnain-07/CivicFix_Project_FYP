import React, { useEffect, useState } from "react";
import { Grid, Typography as MuiTypography } from "@mui/material";

import IncidentsTable from "./IncidentsTable";
import TicketSummaryDoughnutChart from "./TicketSummaryDoughnutChart";
import RadialBarChart from "./RadialBarChart";
import axios from "axios";
import Loader from "../../components/Loader";

// const radialArray = [
//   { data: [55], label: ["ATM"] },
//   { data: [60], label: ["POS"] },
//   { data: [75], label: ["Branch"] },
//   { data: [88], label: ["Digital"] },
// ];

function IncidentManagement() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://resolvex-api.graymushroom-01823765.uksouth.azurecontainerapps.io/api/charts/ticket-summary-chart-radial"
        );
        const data = response?.data?.data;
        if (!data) {
          setLoading(false);
          return;
        }
        setChartData(data?.dataset);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching ticket summary chart data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TicketSummaryDoughnutChart />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          {loading ? (
            <Loader />
          ) : (
            <Grid container spacing={2}>
              {chartData?.map((item, index) => {
                return (
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={index}>
                    <RadialBarChart data={item.data} labels={item.label} />
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Grid>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <IncidentsTable />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default IncidentManagement;
