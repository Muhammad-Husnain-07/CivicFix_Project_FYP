import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { Bar } from "react-chartjs-2";

import { CardContent, Card as MuiCard, Typography } from "@mui/material";
import { spacing } from "@mui/system";
import axios from "axios";
import Loader from "../../../components/Loader";
import apiClient from "../../../utils/axiosConfig";

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
        const data = await apiClient(
          "/complaints/bar-chart-stats?department=SNGPL"
        );
        if(data){
        setChartData({
          labels: data?.labels,
          datasets: data?.datasets?.map((item) => {
            return {
              label: item.label,
              data: item.data,
              stack: "Stack 0",
            };
          }),
        });
        }

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
console.log(chartData)
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
