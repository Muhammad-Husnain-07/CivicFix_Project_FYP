// import React from "react";
// import styled from "@emotion/styled";
// import { withTheme } from "@emotion/react";
// import { Line } from "react-chartjs-2";
// import { MoreVertical } from "lucide-react";

// import {
//   Card as MuiCard,
//   CardContent,
//   CardHeader,
//   IconButton,
// } from "@mui/material";
// import { spacing } from "@mui/system";
// import { alpha } from "@mui/material/styles";

// const Card = styled(MuiCard)(spacing);

// const ChartWrapper = styled.div`
//   height: 378px;
// `;

// function LineChart({ theme }) {

//   const data = {
//     labels: [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//     ],
//     datasets: [
//       {
//         label: "Disputes",
//         fill: true,
//         backgroundColor: function (context) {
//           const chart = context.chart;
//           const { ctx, chartArea } = chart;

//           if (!chartArea) {
//             return null;
//           }

//           const gradient = ctx.createLinearGradient(0, 0, 0, 300);
//           gradient.addColorStop(0, alpha(theme.palette.secondary.main, 0.0875));
//           gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

//           return gradient;
//         },
//         borderColor: theme.palette.secondary.main,
//         tension: 0.4,
//         data: [
//           420, 590, 300, 220, 400, 300
//         ],
//       }
//     ],
//   };

//   const options = {
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: false,
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           color: "rgba(0,0,0,0.0)",
//         },
//       },
//       y: {
//         grid: {
//           color: "rgba(0,0,0,0.0375)",
//           fontColor: "#fff",
//         },
//       },
//     },
//   };

//   return (
//     <Card mb={6}>
//       <CardHeader
//         action={
//           <IconButton aria-label="settings" size="large">
//             <MoreVertical />
//           </IconButton>
//         }
//         title="Disputes"
//       />
//       <CardContent>
//         <ChartWrapper>
//           <Line data={data} options={options} />
//         </ChartWrapper>
//       </CardContent>
//     </Card>
//   );
// }
// export default withTheme(LineChart);

import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { Line } from "react-chartjs-2";
import { MoreVertical } from "lucide-react";
import Loader from "../../../components/Loader";
import {
  Card as MuiCard,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import { spacing } from "@mui/system";
import { alpha } from "@mui/material/styles";

const Card = styled(MuiCard)(spacing);
const ChartWrapper = styled.div`
  height: 275px;
`;

function LineChart({ theme, filter }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const url = `https://resolvex-api.graymushroom-01823765.uksouth.azurecontainerapps.io/api/charts/disputes?timeframe=${filter}`;
        //const response = await axios.post(url);
        //const allDisputes = response.data.data;
        setChartData({
          labels: [
            "Dec",
            "Nov",
            "Oct",
            "Sep",
            "Aug",
            "Jul",
            "Jun",
            "May",
            "Apr",
            "Mar",
            "Feb",
            "Jan",
          ],
          datasets: [
            {
              label: "Complaints",
              fill: true,
              backgroundColor: function (context) {
                const chart = context.chart;
                const { ctx, chartArea } = chart;

                if (!chartArea) {
                  return null;
                }

                const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                gradient.addColorStop(
                  0,
                  alpha(theme.palette.secondary.main, 0.0875)
                );
                gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

                return gradient;
              },
              borderColor: theme.palette.secondary.main,
              tension: 0.4,
              data: [
                420, 590, 300, 220, 400, 300, 420, 590, 300, 220, 400, 300,
              ],
            },
          ],
        });
      } catch (error) {
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
      x: {
        grid: {
          color: "rgba(0,0,0,0.0)",
        },
      },
      y: {
        grid: {
          color: "rgba(0,0,0,0.0375)",
        },
      },
    },
  };

  return (
    <Card mb={6}>
      <CardHeader
        action={
          <IconButton aria-label="settings" size="large">
            <MoreVertical />
          </IconButton>
        }
        title="Complaints"
      />
      <CardContent>
        <ChartWrapper>
          {chartData ? <Line data={chartData} options={options} /> : <Loader />}
        </ChartWrapper>
      </CardContent>
    </Card>
  );
}

export default withTheme(LineChart);
