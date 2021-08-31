import { observer } from "mobx-react-lite";
import Highcharts from "highcharts";
import { useContext, useEffect, useRef, useState } from "react";
import { stateStoreContext } from "../StateStore";
import { StateService } from "../StateService";
import { DataGrid } from "@material-ui/data-grid";
import { Box, CircularProgress, Paper } from "@material-ui/core";
import { Utils } from "../Utils";
import { observe, trace } from "mobx";
import { ChartData } from "../ChartData";
import { setConstantValue, setSyntheticTrailingComments } from "typescript";
import { SettingsInputAntennaTwoTone } from "@material-ui/icons";
import LoadingOverlay from "react-loading-overlay";

export const DailyChart: any = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);
  const [ready, setReady] = useState<boolean>();

  trace(true);

  console.log(stateStore.page);
  console.log(stateStore.pageLoading[0]);

  var url: string;


  if (stateStore.page === "publishers") {
    url =
      stateStore.selectedPublisher === ""
        ? Utils.CreateUrl(
            "dates",
            stateStore.start,
            stateStore.end,
            "none",
            "none",
            "rtb_pub_impressions,rtb_pub_requests,rtb_pub_gross"
          )
        : Utils.CreateUrl(
            "dates",
            stateStore.start,
            stateStore.end,
            "publisher=" + stateStore.selectedPublisher,
            "none",
            "rtb_pub_impressions,rtb_pub_requests,rtb_pub_gross"
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


  console.log(url);
  console.log(ready);

  async function GetPubChartData(url: string) {
    var dates: string[] = [];
    var rev: number[] = [];
    var req: number[] = [];
    var imp: number[] = [];

    return Utils.FetchList(url)
      .then((arr) => {
        for (let i: number = 0; i < arr.length; i++) {
          dates[i] = Utils.FormatDate(arr[i].date);
          rev[i] = arr[i].rtb_pub_gross;
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
  }, [
    stateStore.start,
    stateStore.end,
    stateStore.selectedPublisher,
    stateStore.selectedRemotefeed,
  ]);

  var element = document.getElementById("container");
  const checkExist: any = () => {
    setInterval(() => {
      if (typeof element !== "undefined" && element !== null) {
        setReady(true);
      } else {
        setReady(false);
      }
    }, 100);
  };
  checkExist();
  useEffect(() => {
    if (stateStore.page === "publishers") {
      CreatePubChart([], [], [], []);
    } else if (stateStore.page === "remote feeds") {
      CreateRFChart([], [], [], []);
    }
  }, []);

  useEffect(() => {
    console.log("before ready hit");
    if (ready || typeof(ready) === 'undefined') {
      console.log("after ready hit");
      if (stateStore.page === "publishers") {
        CreatePubChart(
          stateStore.responseDates,
          stateStore.responseRevenue,
          stateStore.responseRequests,
          stateStore.responseImpressions
        );
        stateStore.pageLoading[0] = false;
      } else if (stateStore.page === "remote feeds") {
        CreateRFChart(
          stateStore.responseDates,
          stateStore.rfResponseGrossRev,
          stateStore.rfResponseRequestedBids,
          stateStore.rfResponseBids
        );
        stateStore.pageLoading[0] = false;
      }
    }
  }, [
    stateStore.start,
    stateStore.end,
    stateStore.page,
    stateStore.selectedRemotefeed,
    stateStore.selectedPublisher,
    stateStore.responseDates,
  ]);

  function CreatePubChart(
    responseDates: any,
    responseRevenue: any[],
    responseRequests: any[],
    responseImpressions: any[]
  ) {
    Highcharts.setOptions({
      plotOptions: {
        series: {
          animation: false,
        },
      },
      lang: {
        thousandsSep: ",",
      },
    });

    return Highcharts.chart("container", {
      exporting: {
        enabled: false,
      },

      chart: {
        animation: false,
        height: (4 / 16) * 100 + "%",
        events: {
          load() {
            const chart = this;
            chart.showLoading("Loading...");
            setInterval(function () {
              if (stateStore.pageLoading[0] === false) {
                chart.hideLoading();
              }
            }, 1000);
          },
        },
      },
      title: {
        text: "",
      },
      xAxis: {
        categories: Array.from(responseDates),
        // tickInterval : 5
      },
      yAxis: [
        {
          // Primary yAxis
          title: {
            text: "Impressions/Requests",
            style: {
              color: Highcharts.getOptions().colors[1],
            },
          },
        },
        {
          // Secondary yAxis
          title: {
            text: "Estimated Pub Revenue",
            style: {
              color: Highcharts.getOptions().colors[1],
            },
          },
          labels: {
            format: "${value}",
            style: {
              color: Highcharts.getOptions().colors[1],
            },
          },
          opposite: true,
        },
      ],
      tooltip: {
        shared: true,
        valueDecimals: 2,
      },
      plotOptions: {
        areaspline: {
          fillOpacity: 0.7,
        },
      },
      series: [
        {
          type: "column",
          name: "Estimated Pub Revenue",
          data: responseRevenue,
          color: "#7DC87E",
          yAxis: 1,
          dataLabels: {
            formatter: function () {
              return "$" + Utils.RoundNum(this.y);
            },
            enabled: true,
          },
        },
        {
          type: "areaspline",
          name: "Requests",
          color: "black",
          opacity: 0.6,
          data: responseRequests,
          marker: {
            lineWidth: 1,
          },
          label: {
            enabled: false,
          },
        },
        {
          type: "areaspline",
          name: "Impressions",
          color: "#7DABC8",
          data: responseImpressions,
          marker: {
            lineWidth: 1,
          },
          label: {
            enabled: false,
          },
        },
      ],
    });
  }

  function CreateRFChart(
    responseDates: any,
    responseGrossRev: any[],
    responseReqBids: any[],
    responseBids: any[]
  ) {
    Highcharts.setOptions({
      plotOptions: {
        series: {
          animation: false,
        },
      },
      lang: {
        thousandsSep: ",",
      },
    });

    
    return Highcharts.chart("container", {
      exporting: {
        enabled: false,
      },

      chart: {
        animation: false,
        height: (4 / 16) * 100 + "%",
        events: {
          load() {
            const chart = this;
            chart.showLoading("Loading...");
              if (stateStore.pageLoading[0] === false) {
                chart.hideLoading();
              }
          },
        },
      },
      title: {
        text: "",
      },
      xAxis: {
        categories: Array.from(responseDates),
        // tickInterval : 5
      },
      yAxis: [
        {
          // Primary yAxis
          title: {
            text: "Requested Bids/Bids",
            style: {
              color: Highcharts.getOptions().colors[1],
            },
          },
        },
        {
          // Secondary yAxis
          title: {
            text: "Estimated Gross Revenue",
            style: {
              color: Highcharts.getOptions().colors[1],
            },
          },
          labels: {
            format: "${value}",

            style: {
              color: Highcharts.getOptions().colors[1],
            },
          },
          opposite: true,
        },
      ],
      tooltip: {
        shared: true,
        valueDecimals: 2,
      },
      plotOptions: {
        areaspline: {
          fillOpacity: 0.7,
        },
      },
      series: [
        {
          type: "column",
          name: "Gross Revenue",
          data: responseGrossRev,
          color: "#7DC87E",
          yAxis: 1,
          dataLabels: {
            formatter: function () {
              return "$" + Utils.RoundNum(this.y);
            },
            enabled: true,
          },
        },
        {
          type: "areaspline",
          name: "Requested Bids",
          color: "black",
          opacity: 0.6,
          data: responseReqBids,
          marker: {
            lineWidth: 1,
          },
          label: {
            enabled: false,
          },
        },
        {
          type: "areaspline",
          name: "Bids",
          color: "#7DABC8",
          data: responseBids,
          marker: {
            lineWidth: 1,
          },
          label: {
            enabled: false,
          },
        },
      ],
    });
  }

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
