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
import { ChartData } from "../ChartData";
import { URL } from "url";
import { CreateRFChart } from "./CreateChart";

//need to get dates in the proper order
export const RFDailyChart: any = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  var url =
    stateStore.selectedRemotefeed === ""
      ? "https://dev-app-api.catapultx.com/api/v1/reports/remotefeeds/all/" +
        stateStore.start +
        "/" +
        stateStore.end +
        "/rtb_rem_gross,rtb_rem_imp_requests,rtb_rem_imp_coverage"
      : "https://dev-app-api.catapultx.com/api/v1/reports/remotefeeds/" +
        stateStore.start +
        "/" +
        stateStore.end +
        "/publisher=" +
        stateStore.selectedRemotefeed +
        "/rtb_rem_gross,rtb_rem_imp_requests,rtb_rem_imp_coverage";

  useEffect(() => {
    ChartData.GetDates(url).then(
      (dates) => (stateStore.responseDates = dates)
    );

    ChartData.GetGrossRev(url).then(
      (rev) => (stateStore.rfResponseGrossRev = rev)
    );

    ChartData.GetReqBids(url).then(
      (reqBids) => (stateStore.rfResponseRequestedBids = reqBids)
    );
    ChartData.GetRespBids(url).then((res) => (stateStore.rfResponseBids = res));
  });

  setTimeout(() => CreateRFChart(
    stateStore.responseDates,
    stateStore.rfResponseGrossRev,
    stateStore.rfResponseRequestedBids,
    stateStore.rfResponseBids
  ), 1000);

 

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
