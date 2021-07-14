import React, { useState, useEffect, useContext, createContext } from "react";
import { Title } from "./Components/Title";
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
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { orange, purple } from "@material-ui/core/colors";
import { stateStoreContext } from "./StateStore";
import { observer } from "mobx-react-lite";
import { StateService } from "./StateService";
import { Link } from "react-router-dom";
import { Charts } from "./Components/Charts";
import { GoButton } from "./Components/GoButton";
import { NavBar } from "./Components/NavBar";
import { NewPage } from "./NewPage";
import { spacing } from "@material-ui/system";
import { EstimatedRevenue } from "./Components/EstimatedRevenue";
import { Requests } from "./Components/Requests";
import { Impressions } from "./Components/Impressions";
import { Ecpm } from "./Components/Ecpm";
import { FillRate } from "./Components/FillRate";
import { SpacedPanels } from "./Organization/SpacedPanels";
import { DailyImpressionsChart } from "./Components/DailyImpressionsChart";
import { ZoneFeedData } from "./Components/ZoneFeedData";

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
    <div style={{backgroundColor: "#F2F3F4"}}>
      <Router>
        <div className="PageConstants">
          <NavBar />
          <SpacedPanels />
        </div>
        <div className="Content">
          <Switch>
            <Route exact path="/">
              <Redirect exact from="/" to="/publishers" />
            </Route>
            <Route exact path="/publishers">
              {/* <DailyImpressionsChart /> */}
              <ZoneFeedData />
            </Route>
            <Route exact path="/RemoteFeeds">
              <NewPage />
            </Route>
          </Switch>
        </div>
      </Router>
      </div>
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
