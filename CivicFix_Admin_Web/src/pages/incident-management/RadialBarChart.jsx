import React from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import Chart from "react-apexcharts";

import { CardContent, Card as MuiCard, Typography } from "@mui/material";
import { spacing } from "@mui/system";
const Card = styled(MuiCard)(spacing);

const Spacer = styled.div(spacing);

const ChartWrapper = styled.div`
  height: 160px;
  width: 100%;
`;

const RadialBarChart = ({ theme,data,labels }) => {

  const options = {
    chart: {
      type: "radialBar",
    },

    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          size: "60%",
        },
        track: {
          background: theme.palette.background.default,
          startAngle: -135,
          endAngle: 135,
        },
        dataLabels: {
          name: {
            offsetY: 60,
            fontSize: "14px",
            color: theme.palette.text.primary,
            formatter: function (val) {
              return val;
            },
          },
          value: {
            show: true,
            color: theme.palette.text.primary,
            fontSize: "18px",
            formatter: function (val) {
              return `${(val)}%`;
            },
          },
        },
      },
    },
    labels: labels,
    colors: ["#783bd8"],
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (val) => {
          return `${(val)}%`;
        },
      },
    },
  };

  return (
    <Card mb={1}>
      <CardContent style={{ padding: 0 }}>
        <ChartWrapper>
          <Chart
            options={options}
            series={data}
            type="radialBar"
            height={160}
          />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
};

export default withTheme(RadialBarChart);
