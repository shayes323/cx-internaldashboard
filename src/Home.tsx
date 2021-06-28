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
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { orange, purple } from "@material-ui/core/colors";
import { TextFields } from "./Components/TextFields";
import { stateStoreContext } from "./StateStore";
import { observer } from "mobx-react-lite";
import { StateService } from "./StateService";
import { Link } from "react-router-dom";
import { ZonesDropDown } from "./Components/ZonesDropdown";
import { Charts } from "./Components/Charts";
import { GoButton } from "./Components/GoButton";
import { NavBar } from "./Components/NavBar";
import { NewPage } from "./NewPage";

export const Home: any = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);

  var url: string =
    stateStore.clickedButton === true
      ? "https://dev-app-api.catapultx.com/api/v1/reports/" +
        stateStore.reportType +
        "/all/" +
        stateStore.start +
        "/" +
        stateStore.end
      : "";

  const zonesUrl =
    stateStore.start != "" && stateStore.end != ""
      ? "https://dev-app-api.catapultx.com/api/v1/reports/zones/all/" +
        stateStore.start +
        "/" +
        stateStore.end
      : "";

  url =
    stateStore.selectedZone != ""
      ? "https://dev-app-api.catapultx.com/api/v1/reports/" +
        stateStore.reportType +
        "/" +
        stateStore.start +
        "/" +
        "zone=" +
        stateStore.selectedZone
      : url;

  useEffect(() => {
    new StateService(url)
      .Get()
      .then((data) => (stateStore.responseData = data))
      .then(() => console.log(stateStore.responseData));
    console.log(stateStore.responseData);
  });

  useEffect(() => {
    new StateService(zonesUrl)
      .Get()
      .then((data: any) => data.map((data: any) => data.zone))
      .then((mapped) => (stateStore.zonesList = mapped))
      .then(() => console.log(stateStore.zonesList));
  });

  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <div className="PageConstants">
          <NavBar />
          <TextFields />
          <ZonesDropDown />
          <GoButton />
        </div>
        <div className="Content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/RemoteFeeds">
              <NewPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
});

const Theme: any = createMuiTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: orange[400],
    },
  },
  typography: {
    fontFamily: "Montserrat",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});
