import React, { useState, useEffect, useContext, createContext } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Box, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { orange, purple } from "@material-ui/core/colors";
import { stateStoreContext } from "./StateStore";
import { observer } from "mobx-react-lite";
import { StateService } from "./StateService";
import { Link } from "react-router-dom";
import { NavBar } from "./Components/NavBar";
import { spacing } from "@material-ui/system";
import { EstimatedRevenue } from "./Components/TopPanels/EstimatedRevenue";
import { Requests } from "./Components/TopPanels/Requests";
import { Impressions } from "./Components/TopPanels/Impressions";
import { Ecpm } from "./Components/TopPanels/Ecpm";
import { FillRate } from "./Components/TopPanels/FillRate";
import { PublishersSpacedPanels } from "./Organization/PublishersSpacedPanels";
import { PubDailyChart } from "./Components/PubDailyChart";
import { ZoneFeedData } from "./Components/ZoneFeedData";
import { PublishersChartsPlacement } from "./Organization/PublishersChartsPlacement";
import { RemoteFeedsNavBar } from "./Components/RemoteFeedsNavBar";
import { RFSpacedPanels } from "./Organization/RFSpacedPanels";
import { RFDailyChart } from "./Components/RFDailyChart";
import { RFChartsPlacement } from "./Organization/RFChartsPlacement";

export const Home: any = observer<any, any>(() => {
  // useEffect(() => {
  //   new StateService(url)
  //     .Get()
  //     .then((jres) => jres.list)
  //     .then((data) => (stateStore.responseData = data))
  //     .then(() => console.log(stateStore.responseData))
  //     .then(() => (stateStore.clickedButton = false));
  //   console.log(stateStore.responseData);
  // });

  

 

  return (
    <Box style={{ height: '100vh', minHeight: "100vh", backgroundColor: "#F2F3F4"}}>
    <div>
      <Router>
         <div className="PageConstants">
         <NavBar />
        </div>
            <div className="Content">
          <Switch>
            <Route exact path="/">
              <Redirect exact from="/" to="/publishers" />
            </Route>
            <Route exact path="/publishers">
              <div style={{backgroundColor: "#F2F3F4"}}>
                <PublishersSpacedPanels />
              </div>
              <PublishersChartsPlacement />
            </Route>
            <Route exact path="/RemoteFeeds">
              <div style={{backgroundColor: "#F2F3F4"}}>
                {/* <RemoteFeedsNavBar /> */}
                <RFSpacedPanels />
              </div>
              <RFChartsPlacement />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
    </Box>
  );
});

// export const Theme: any = createMuiTheme({
//   palette: {
//     primary: {
//       main: "#FFFFFF",
//     },
//     secondary: {
//       main: "#eceff1",
//     },
//   },
//   typography: {
//     fontFamily: "Montserrat",
//     fontWeightLight: 400,
//     fontWeightRegular: 500,
//     fontWeightMedium: 600,
//     fontWeightBold: 700,
//   },
// });
