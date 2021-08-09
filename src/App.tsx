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
import { EstimatedRevenue } from "./Components/TopPanels/Publishers/EstimatedRevenue";
import { Requests } from "./Components/TopPanels/Publishers/Requests";
import { Impressions } from "./Components/TopPanels/Publishers/Impressions";
import { Ecpm } from "./Components/TopPanels/Publishers/Ecpm";
import { FillRate } from "./Components/TopPanels/Publishers/FillRate";
import { PublishersSpacedPanels } from "./Organization/PublishersSpacedPanels";
import { PubDailyChart } from "./Components/PubDailyChart";
import { ZoneFeedData } from "./Components/ZoneFeedData";
import { PublishersChartsPlacement } from "./Organization/PublishersChartsPlacement";
import { RFSpacedPanels } from "./Organization/RFSpacedPanels";
import { RFChartsPlacement } from "./Organization/RFChartsPlacement";
import { PieChart } from "./Components/PieChart";
import './auth/auth.config';
import SignIn from './auth/SignIn';
import AuthProvider from './auth/AuthProvider';
import { RoutePath } from "./common/route-path";
import './App.css'




export const App: any = () => {
  return (
 
    <Router>
      <Route path={RoutePath.Login}>
        <SignIn />
      </Route>
      <AuthProvider>
    <div className="page">
    <Box style={{minHeight: "110vh"}}>
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
              <div>
                <PublishersSpacedPanels />
              </div>
              <PublishersChartsPlacement />
            </Route>
            <Route exact path="/RemoteFeeds">
              <div>
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
    </div>
    </AuthProvider>
    </Router>

  
  );
};
