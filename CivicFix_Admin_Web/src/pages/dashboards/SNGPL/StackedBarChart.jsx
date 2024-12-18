import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { Bar } from "react-chartjs-2";

import { CardContent, Card as MuiCard, Typography } from "@mui/material";
import { spacing } from "@mui/system";
import axios from "axios";
import Loader from "../../../components/Loader";

const Card = styled(MuiCard)(spacing);

const Spacer = styled.div(spacing);

const ChartWrapper = styled.div`
   width: 100%;
`;

const StackedBarChart = ({ theme, filter }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // const url = `https://resolvex-api.graymushroom-01823765.uksouth.azurecontainerapps.io/api/charts/resolved-disputes`;
        // const response = await axios.post(url, {
        //   timeframe: filter,
        // });
        // const allResolvedHours = response.data;
        // if (!allResolvedHours) {
        //   setLoading(false);
        //   return;
        // }
        setChartData({
          labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Reported",
              data: [45, 35, 25, 75, 65, 55, 45, 35, 45, 55, 65, 75],
              backgroundColor: theme.palette.secondary.light,
              stack: "Stack 0",
            },
            {
              label: "Resolved",
              data: [55, 65, 75, 25, 35, 45, 55, 65, 75, 85, 95, 105],
              backgroundColor: theme.palette.primary.light,
              stack: "Stack 0",
            },
            {
              label: "Closed",
              data: [65, 75, 85, 15, 25, 35, 45, 55, 65, 75, 85, 95],
              backgroundColor: theme.palette.error.light,
              stack: "Stack 0",
            }
          ],
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching the chart data", error);
      }
    };

    fetchData();
  }, [filter, theme]);
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        grid: {
          display: false,
        },
        stacked: true,
        ticks: {
          stepSize: 20,
        },
      },

      x: {
        stacked: true,
        grid: {
          color: "transparent",
        },
      },
    },
  };

  return (
    <Card mb={1}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Complaints by Month
        </Typography>

        <Spacer mb={6} />
        {loading ? (
          <Loader />
        ) : (
          <ChartWrapper>
            <Bar data={chartData} options={options} />
          </ChartWrapper>
        )}
      </CardContent>
    </Card>
  );
};

export default withTheme(StackedBarChart);

