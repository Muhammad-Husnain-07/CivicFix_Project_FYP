import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import Chart from "react-apexcharts";

import { CardContent, Card as MuiCard, Typography } from "@mui/material";
import { spacing } from "@mui/system";
import axios from "axios";
import Loader from "../../../components/Loader";
const Card = styled(MuiCard)(spacing);

const Spacer = styled.div(spacing);

const ChartWrapper = styled.div`
  height: 300px;
`;

const PieChart = ({ theme, filter }) => {
  const [chartData, setChartData] = useState({ labels: [], data: [] });
  const [loading, setLoading] = useState(false);

  const options = {
    chart: {
      type: "pie",
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#fff"],
        fontWeight: "300",
      },
      formatter: function (val) {
        return val?.toFixed(2) + "%";
      },
    },
    legend: {
      position: "bottom",
      labels: {
        colors: theme.palette.text.primary,
      },
    },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
    stroke: {
      show: false,
    },
    labels: chartData?.labels,
    // colors: [
    //   theme.palette.primary.light,
    //   theme.palette.success.light,
    //   theme.palette.warning.light,
    //   theme.palette.error.light,
    //   theme.palette.info.light,
    // ],
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // const url = `https://resolvex-api.graymushroom-01823765.uksouth.azurecontainerapps.io/api/charts/dispute-channels`;
        // const response = await axios.post(url, {
        //   timeframe: filter,
        // });
        // const allChannels = response.data.data;
        // if (!allChannels) {
        //   setLoading(false);
        //   setChartData({ labels: [], data: [] });
        //   return;
        // }
        setLoading(false);
        setChartData({
          labels: ["Reported", "Resolved", "Closed"],
          data: [240, 100, 80],
        });
      } catch (error) {
        setChartData({ labels: [], data: [] });
        setLoading(false);
        console.error("Error fetching the chart data", error);
      }
    };

    fetchData();
  }, [filter, theme]);

  return (
    <Card mb={1}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Complaints Channels
        </Typography>
        <Spacer mb={6} />

        {loading ? (
          <Loader />
        ) : (
          <ChartWrapper>
            <Chart
              options={options}
              series={chartData?.data}
              type="pie"
              height="260"
            />
          </ChartWrapper>
        )}
      </CardContent>
    </Card>
  );
};

export default withTheme(PieChart);
