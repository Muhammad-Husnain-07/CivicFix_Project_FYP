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
  height: 220px;
  width: 100%;
`;

const BarChart = ({ theme, filter }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(false);
  // const data = {
  //   labels: ["ATM", "Online", "Schemes", "Merchant"],
  //   datasets: [
  //     {
  //       label: "Text 1",
  //       backgroundColor: theme.palette.secondary.main,
  //       borderColor: theme.palette.secondary.main,
  //       hoverBackgroundColor: theme.palette.secondary.main,
  //       hoverBorderColor: theme.palette.secondary.main,
  //       data: [44, 17, 41, 65],
  //       barPercentage: 0.75,
  //       categoryPercentage: 0.5,
  //     },
  //     {
  //       label: "Text 2",
  //       backgroundColor: theme.palette.grey[300],
  //       borderColor: theme.palette.grey[300],
  //       hoverBackgroundColor: theme.palette.grey[300],
  //       hoverBorderColor: theme.palette.grey[300],
  //       data: [69, 46, 54, 48],
  //       barPercentage: 0.75,
  //       categoryPercentage: 0.5,
  //     },
  //     {
  //       label: "Text 3",
  //       backgroundColor: theme.palette.primary.main,
  //       borderColor: theme.palette.primary.main,
  //       hoverBackgroundColor: theme.palette.primary.main,
  //       hoverBorderColor: theme.palette.primary.main,
  //       data: [39, 86, 24, 38],
  //       barPercentage: 0.75,
  //       categoryPercentage: 0.5,
  //     },
  //   ],
  // };

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
          labels: ["LESCO", "SNGPL"],
          datasets: [
            {
              label: "App",
              data: [10, 20],
              barPercentage: 0.75,
              categoryPercentage: 0.5,
            },
            {
              label: "Web",
              data: [20, 10],
              barPercentage: 0.75,
              categoryPercentage: 0.5,
            },
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
  console.log(chartData);
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
        stacked: false,
        ticks: {
          stepSize: 20,
        },
      },

      x: {
        stacked: false,
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
          Resolve (Hours)
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

export default withTheme(BarChart);
