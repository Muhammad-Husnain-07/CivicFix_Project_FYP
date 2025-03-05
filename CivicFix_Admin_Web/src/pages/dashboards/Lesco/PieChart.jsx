import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import Chart from "react-apexcharts";

import { CardContent, Card as MuiCard, Typography } from "@mui/material";
import { spacing } from "@mui/system";
import axios from "axios";
import Loader from "../../../components/Loader";
import apiClient from "../../../utils/axiosConfig";
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
        const data = await apiClient(
          "/complaints/pie-chart-stats?department=LESCO"
        );
        if (data) {
          setChartData(data);
        }
        setLoading(false);
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
