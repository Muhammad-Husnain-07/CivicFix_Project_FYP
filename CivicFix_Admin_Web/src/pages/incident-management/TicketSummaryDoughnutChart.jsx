import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import Chart from "react-apexcharts";

import { CardContent, Card as MuiCard, Typography } from "@mui/material";
import { spacing } from "@mui/system";
import axios from "axios";
import Loader from "../../components/Loader";
const Card = styled(MuiCard)(spacing);

const Spacer = styled.div(spacing);

const ChartWrapper = styled.div`
  height: 250px;
  width: 100%;
`;

const TicketSummaryDoughnutChart = ({ theme }) => {
  const [chartData, setChartData] = useState({ labels: [], data: [] });
  const [loading, setLoading] = useState(false);

  const options = {
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#fff"],
        fontWeight: "300",
      },
      formatter: function (val) {
        return parseInt(val) + "%";
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        opacity: 0.45,
      },
    },
    stroke: {
      show: false,
    },
    legend: {
      position: "right",
      labels: {
        colors: theme.palette.text.primary,
      },
    },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: function (val) {
          return parseInt(val) + "%";
        },
      },
    },
    labels: chartData?.labels,
    // colors: [
    //   theme.palette.success.main,
    //   theme.palette.warning.main,
    //   theme.palette.info.main,
    //   theme.palette.error.main,
    //   theme.palette.primary.main,
    // ],
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://resolvex-api.graymushroom-01823765.uksouth.azurecontainerapps.io/api/charts/ticket-summary-chart"
        );
        const data = response?.data?.data;
        if (!data) {
          setLoading(false);
          return;
        }
        setChartData({ labels: data?.labels, data: data?.dataSets });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching ticket summary chart data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card mb={1}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Ticket Summary
        </Typography>
        <Spacer mb={6} />

        {loading ? (
          <Loader />
        ) : (
          <ChartWrapper>
            <Chart
              options={options}
              series={chartData?.data}
              type="donut"
              height="220"
            />
          </ChartWrapper>
        )}
      </CardContent>
    </Card>
  );
};

export default withTheme(TicketSummaryDoughnutChart);
