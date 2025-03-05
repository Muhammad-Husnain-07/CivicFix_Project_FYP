import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { Line } from "react-chartjs-2";
import { Card as MuiCard, CardContent, CardHeader } from "@mui/material";
import { spacing } from "@mui/system";
import axios from "axios";
import Loader from "../../../components/Loader";
import apiClient from "../../../utils/axiosConfig";

const Card = styled(MuiCard)(spacing);

const ChartWrapper = styled.div`
  height: 290px;
`;
function MultiAxisLineChart({ theme }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(false);
  // const labels = ["January", "February", "March", "April", "May", "June"];
  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: "CAT 1",
  //       data: [32, 39, 33, 35, 32, 33],
  //       borderColor: "#3F51B5",
  //       backgroundColor: alpha("#3F51B5", 0.5),
  //       yAxisID: "y",
  //     },
  //     {
  //       label: "CAT 2",
  //       data: [20, 21, 25, 20, 26, 22],
  //       borderColor: "#2196F3",
  //       backgroundColor: alpha("#2196F3", 0.5),
  //       yAxisID: "y",
  //     },
  //     {
  //       label: "CAT 3",
  //       data: [12, 14, 13, 15, 12, 13],
  //       borderColor: "#FF9800",
  //       backgroundColor: alpha("#FF9800", 0.5),
  //       yAxisID: "y",
  //     },
  //     {
  //       label: "Lost",
  //       data: [12, 4, 4, 4, 4, 13],
  //       borderColor: "#E2252B",
  //       backgroundColor: alpha("#E2252B", 0.5),
  //       yAxisID: "y",
  //     },
  //   ],
  // };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await apiClient("/department-monthly-stats");
        if (data) {
          setChartData({
            labels: data?.labels,
            datasets: data?.datasets?.map((item) => {
              return {
                ...item,
                yAxisID: "y",
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
  }, [theme]);
  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          color: theme.palette.text.primary,
        },
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
    },
  };
  return (
    <Card mb={6}>
      <CardHeader title="Complaint Trends" />
      <CardContent>
        {loading ? (
          <Loader />
        ) : (
          <ChartWrapper>
            <Line data={chartData} options={options} />
          </ChartWrapper>
        )}
      </CardContent>
    </Card>
  );
}
export default withTheme(MultiAxisLineChart);
