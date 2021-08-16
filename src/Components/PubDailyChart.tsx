import { observer } from "mobx-react-lite";
import Highcharts from "highcharts";
import { useContext, useEffect, useRef, useState } from "react";
import { stateStoreContext } from "../StateStore";
import { StateService } from "../StateService";
import { DataGrid } from "@material-ui/data-grid";
import { Accumulate } from "../AccumulateData";
import { Box, CircularProgress, Paper } from "@material-ui/core";
import { Utils } from "../Utils";
import { CreatePubChart, CreateRFChart } from "./CreateChart";
import { observe } from "mobx";
import { ChartData } from "../ChartData";
import { setConstantValue, setSyntheticTrailingComments } from "typescript";
import { SettingsInputAntennaTwoTone } from "@material-ui/icons";
import LoadingOverlay from 'react-loading-overlay';

export const PubDailyChart: any = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);
  var url: string;
  const [ready, setReady] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>();

  if (stateStore.page === "publishers") {
    url =
      stateStore.selectedPublisher === ""
        ? Utils.CreateUrl(
            "dates",
            stateStore.start,
            stateStore.end,
            "none",
            "none",
            "rtb_pub_impressions,rtb_pub_requests,rtb_pub_revenue"
          )
        : Utils.CreateUrl(
            "dates",
            stateStore.start,
            stateStore.end,
            "publisher=" + stateStore.selectedPublisher,
            "none",
            "rtb_pub_impressions,rtb_pub_requests,rtb_pub_revenue"
          );
  } else if (stateStore.page === "remote feeds") {
    url =
      stateStore.selectedRemotefeed === ""
        ? Utils.CreateUrl(
            "dates",
            stateStore.start,
            stateStore.end,
            "none",
            "none",
            "rtb_rem_gross,rtb_rem_imp_requests,rtb_rem_imp_coverage"
          )
        : Utils.CreateUrl(
            "dates",
            stateStore.start,
            stateStore.end,
            "remotefeed=" + stateStore.selectedRemotefeed,
            "none",
            "rtb_rem_gross,rtb_rem_imp_requests,rtb_rem_imp_coverage"
          );
  }

  async function GetPubChartData(url: string) {
    var dates: string[] = [];
    var rev: number[] = [];
    var req: number[] = [];
    var imp: number[] = [];

    return Utils.FetchList(url)
      .then((arr) => {
        for (let i: number = 0; i < arr.length; i++) {
          dates[i] = Utils.FormatDate(arr[i].date);
          rev[i] = arr[i].rtb_pub_revenue;
          req[i] = arr[i].rtb_pub_requests;
          imp[i] = arr[i].rtb_pub_impressions;
        }
      })
      .then(() => (stateStore.responseDates = dates))
      .then(() => (stateStore.responseRevenue = rev))
      .then(() => (stateStore.responseRequests = req))
      .then(() => (stateStore.responseImpressions = imp));
  }

  async function GetRFChartData(url: string) {
    var dates: string[] = [];
    var grossRev: number[] = [];
    var reqBids: number[] = [];
    var respBids: number[] = [];

    return Utils.FetchList(url)
      .then((arr) => {
        for (let i: number = 0; i < arr.length; i++) {
          dates[i] = Utils.FormatDate(arr[i].date);
          grossRev[i] = arr[i].rtb_rem_gross;
          reqBids[i] = arr[i].rtb_rem_imp_requests;
          respBids[i] = arr[i].rtb_rem_imp_coverage;
        }
      })
      .then(() => (stateStore.responseDates = dates))
      .then(() => (stateStore.rfResponseGrossRev = grossRev))
      .then(() => (stateStore.rfResponseRequestedBids = reqBids))
      .then(() => (stateStore.rfResponseBids = respBids));
  }

  useEffect(() => {
    if (stateStore.page === "publishers") {
      GetPubChartData(url);
    } else if (stateStore.page === "remote feeds") {
      GetRFChartData(url);
    }
  }, [stateStore.start, stateStore.end, stateStore.selectedPublisher, stateStore.selectedRemotefeed]);

  // ChartData.GetDates(url).then(
  //   (dates: any) => (stateStore.responseDates = dates)
  // );
  // ChartData.GetGrossRev(url).then(
  //   (rev) => (stateStore.rfResponseGrossRev = rev)
  // );
  // ChartData.GetReqBids(url).then(
  //   (reqBids) => (stateStore.rfResponseRequestedBids = reqBids)
  // );
  // ChartData.GetRespBids(url).then(
  //   (res) => (stateStore.rfResponseBids = res)
  // var checkExist = setInterval(function () {
  //   if ($("#highcharts").length) {
  //     console.log("Exists!");
  //     clearInterval(checkExist);
  //   }
  // }, 100); // check every 100ms

  // useEffect(() => {
  //   if (stateStore.page === "publishers") {
  //     CreatePubChart([], [], [], []);
  //   } else if (stateStore.page === "remote feeds") {
  //     CreateRFChart([], [], [], []);
  //   }

  var element = document.getElementById("container");
  const checkExist: any = () => {
    setInterval(() => {
    if (typeof(element) != 'undefined' && element != null) {
      // <CircularProgress />
      setReady(true);
    } else {
      setReady(false);

    }
  }, 100);
}
  checkExist();
  useEffect(() => {
    if (stateStore.page === "publishers") {
      CreatePubChart([], [], [], []);
    } else if (stateStore.page === "remote feeds") {
      CreateRFChart([], [], [], []);
    }
  }, []);

  useEffect(() => {
    if (ready) {
      if (stateStore.page === "publishers") {
        CreatePubChart(
          stateStore.responseDates,
          stateStore.responseRevenue,
          stateStore.responseRequests,
          stateStore.responseImpressions
        );
        stateStore.pageLoading[0] = false;
      } else if (stateStore.page === "remote feeds") {
        console.log(url);
        CreateRFChart(
          stateStore.responseDates,
          stateStore.rfResponseGrossRev,
          stateStore.rfResponseRequestedBids,
          stateStore.rfResponseBids
        );
        stateStore.pageLoading[0] = false;
        setLoading(false);
      }
    }}, [stateStore.responseDates])


  // useEffect(() => {
  //   setTimeout(() => {
  //     if (stateStore.page === "publishers") {
  //       CreatePubChart(
  //         stateStore.responseDates,
  //         stateStore.responseRevenue,
  //         stateStore.responseRequests,
  //         stateStore.responseImpressions
  //       );
  //     } else if (stateStore.page === "remote feeds") {
  //       console.log("RF hit");
  //       console.log(url);
  //       CreateRFChart(
  //         stateStore.responseDates,
  //         stateStore.rfResponseGrossRev,
  //         stateStore.rfResponseRequestedBids,
  //         stateStore.rfResponseBids
  //       );
  //       console.log("RF hit again");
  //     }
  //   }, 1500);
  // });

  return (
    <Box m={2} style={{ marginTop: "-3px" }}>
      {/* <LoadingOverlay
      active={loading === false}> */}
      <Paper>
        <div>
          <div id="container"></div>
        </div>
      </Paper>
      {/* </LoadingOverlay> */}
    </Box>
  );
});
