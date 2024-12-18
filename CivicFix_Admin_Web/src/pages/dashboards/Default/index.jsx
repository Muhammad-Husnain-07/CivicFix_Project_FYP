// import React from "react";
// import styled from "@emotion/styled";
// import { Helmet } from "react-helmet-async";
// import { useTranslation } from "react-i18next";

// import {
//   Grid,
//   Divider as MuiDivider,
//   Typography as MuiTypography,
// } from "@mui/material";
// import { spacing } from "@mui/system";
// import { green, red } from "@mui/material/colors";
// import Actions from "./Actions";
// import BarChart from "./BarChart";
// import LineChart from "./LineChart";
// import Stats from "./Stats";
// import Table from "./Table";
// import MiniTable from "./MiniTable";
// import PieChart from "./PieChart";
// import MultiAxisLineChart from "./MultiAxisLineChart";
// import WorldMap from "./WorldMap";
// import MapComponent from "./MapComponent";

// const Divider = styled(MuiDivider)(spacing);

// const Typography = styled(MuiTypography)(spacing);

// function Default() {

//   return (
//     <React.Fragment>
//       <Helmet title="CivicFix Dashboard" />
//       <Grid justifyContent="space-between" container spacing={6}>
//         <Grid item>
//           <Typography variant="h3" gutterBottom>
//             Summary Dashboard
//           </Typography>
//           {/* <Typography variant="subtitle1">
//             {t("Welcome back")}{" "}
//             <span role="img" aria-label="Waving Hand Sign">
//               👋
//             </span>
//           </Typography> */}
//         </Grid>

//         <Grid item>
//           <Actions />
//         </Grid>
//       </Grid>

//       <Divider my={6} />

//       <Grid id container spacing={6}>
//         <Grid container item xs={12} sm={12} md={8} lg={6} xl={6} spacing={6}>
//           <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
//             <LineChart />
//           </Grid>
//         </Grid>
//         <Grid container item xs={12} sm={12} md={8} lg={6} xl={6} spacing={3}>
//           <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
//             <Stats
//               title="Dispute Value"
//               amount="$89,950"
//               chip="Today"
//               percentagetext="+19%"
//               percentagecolor={green[500]}
//             />
//           </Grid>
//           <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
//             <Stats
//               title="Resolved Value"
//               amount="$79,550"
//               chip="Today"
//               percentagetext="-9%"
//               percentagecolor={red[500]}
//             />
//           </Grid>
//           <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
//             <Stats
//               title="Dispute"
//               amount="117"
//               chip="Today"
//               percentagetext="+19%"
//               percentagecolor={green[500]}
//             />
//           </Grid>
//           <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
//             <Stats
//               title="Active"
//               amount="91"
//               chip="Today"
//               percentagetext="-9%"
//               percentagecolor={red[500]}
//             />
//           </Grid>
//           <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
//             <Stats
//               title="Review"
//               amount="64"
//               chip="Today"
//               percentagetext="+10%"
//               percentagecolor={green[500]}
//             />
//           </Grid>
//           <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
//             <Stats
//               title="Resolved"
//               amount="26"
//               chip="Today"
//               percentagetext="+54%"
//               percentagecolor={green[500]}
//             />
//           </Grid>
//         </Grid>
//       </Grid>

//       <Grid container spacing={6}>
//         <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
//           <MiniTable />
//         </Grid>
//         <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
//           <PieChart />
//         </Grid>
//         <Grid item xs={12} sm={12} md={4} lg={5} xl={5}>
//           <BarChart />
//         </Grid>
//       </Grid>
//       <Grid container spacing={6}>
//         <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
//           <MultiAxisLineChart />
//         </Grid>
//         <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
//           <MapComponent />
//         </Grid>
//       </Grid>
//       <Grid container spacing={6}>
//         <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
//           <Table />
//         </Grid>
//       </Grid>
//     </React.Fragment>
//   );
// }

// export default Default;

import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
  Box as MuiBox,
  Card as MuiCard,
  CardContent,
} from "@mui/material";
import { spacing } from "@mui/system";
import { green, red } from "@mui/material/colors";
import Actions from "./Actions";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import Stats from "./Stats";
import Table from "./Table";
import MiniTable from "./MiniTable";
import PieChart from "./PieChart";
import MultiAxisLineChart from "./MultiAxisLineChart";
import MapComponent from "./MapComponent";
import axios from "axios";
import Loader from "../../../components/Loader";

const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);

const TotalCard = styled(MuiCard)(spacing);
`
  text-align: center;
  background-color: ${(props) => rgba(props.theme.palette.primary.main, 0.25)};
  color: ${(props) => props.theme.palette.primary.main};
`;

function Default({ theme }) {
  const [filter, setFilter] = useState({
    label: "Last 7 Days",
    value: "last7days",
  });
  const [statsData, setStatsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const url = `https://resolvex-api.graymushroom-01823765.uksouth.azurecontainerapps.io/api/charts/disputes-stats`;
        //const response = await axios.post(url, { timeframe: filter.value });
        //const allStats = response.data;
        setStatsData([
          {
            title: "Reported",
            count: 91,
            chip: filter?.value,
            percentagetext: "0%",
          },
          {
            title: "In Progress",
            count: 117,
            chip: filter?.value,
            percentagetext: "0%",
          },
          {
            title: "Resolved",
            count: 26,
            chip: filter?.value,
            percentagetext: "0%",
          },
          {
            title: "Closed",
            count: 64,
            chip: filter?.value,
            percentagetext: "0%",
          },
        ]);
      } catch (error) {
        setStatsData([]);
        console.error("Error fetching the chart data", error);
      }
    };

    fetchData();
  }, [filter, theme]);
  return (
    <React.Fragment>
      <Helmet title="CivicFix Dashboard" />
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Summary Dashboard
          </Typography>
        </Grid>
        <Grid item>
          <Actions filter={filter} setFilter={setFilter} />
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6} mb={6}>
        <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
          <LineChart filter={filter?.value} />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={6} xl={6}>
          {statsData ? (
            <>
              <TotalCard mb={3}>
                <CardContent>
                  <Typography variant="h3">
                    {"Total Complaints:" + " " + "3000"}
                  </Typography>
                </CardContent>
              </TotalCard>
              <Grid container spacing={3}>
                {statsData.map((item, index) => (
                  <Grid key={index} item xs={12} sm={12} md={12} lg={6} xl={6}>
                    <Stats
                      title={item.title}
                      amount={item.count ? item.count : "-"}
                      chip={
                        filter?.value === item.chip
                          ? filter?.label
                          : item.chip ?? "-"
                      }
                      percentagetext={item.percentagetext}
                      percentagecolor={
                        item.percentagetext?.includes("-")
                          ? red[500]
                          : green[500]
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Loader />
            </Grid>
          )}
        </Grid>
      </Grid>

      <Grid container spacing={6} mb={10}>
        {/* <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
          <MiniTable filter={filter?.value} />
        </Grid> */}
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
          <PieChart filter={filter?.value} />
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
          <MultiAxisLineChart />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Default;
