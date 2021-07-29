import { observer } from "mobx-react-lite";
import Highcharts from "highcharts";
import { useContext, useEffect, useState } from "react";
import { stateStoreContext } from "../StateStore";
import { StateService } from "../StateService";
import { DataGrid } from "@material-ui/data-grid";
import { DateFormatter } from "../DateFormatter";
import {
  DateRangeSharp,
  SettingsInputAntennaTwoTone,
} from "@material-ui/icons";
import { Accumulate } from "../AccumulateData";
import { Box, Paper } from "@material-ui/core";
import { Utils } from "../Utils";
import { CreatePubChart } from "./CreateChart";
import { observe } from "mobx";
import {ChartData} from '../ChartData';

export const PubDailyChart: any = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);

  var url =
    stateStore.selectedPublisher === ""
      ? "https://dev-app-api.catapultx.com/api/v1/reports/publishers/all/" +
        stateStore.start +
        "/" +
        stateStore.end +
        "/rtb_pub_impressions,rtb_pub_requests,rtb_pub_revenue"
      : "https://dev-app-api.catapultx.com/api/v1/reports/publishers/" +
        stateStore.start +
        "/" +
        stateStore.end +
        "/publisher=" +
        stateStore.selectedPublisher +
        "/rtb_pub_impressions,rtb_pub_requests,rtb_pub_revenue";


  useEffect(() => {
    console.log(url);
    ChartData.GetDates(url).then((dates) => stateStore.responseDates = dates);
    ChartData.GetRevenue(url).then((rev) => stateStore.responseRevenue = rev);
    ChartData.GetRequests(url).then((req) => stateStore.responseRequests = req);
    ChartData.GetImpressions(url).then((imp) => stateStore.responseImpressions = imp);

    setTimeout(() => CreatePubChart(
      stateStore.responseDates,
      stateStore.responseRevenue,
      stateStore.responseRequests,
      stateStore.responseImpressions
    ), 2000);
    });

  return (
    <Box m={2} style={{ marginTop: "-3px" }}>
      <Paper>
        <div>
          <div id="container"></div>
        </div>
      </Paper>
    </Box>
  );
});
