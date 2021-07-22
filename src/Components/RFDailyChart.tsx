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

  console.log(url);
  useEffect(() => {
    new StateService(url)
      .Get()
      .then((jres) => jres.list)
      .then((data: any) =>
        data.map((data: any) => new DateFormatter(data.date).format())
      )
      .then((dates) => new Set<any>(dates))
      .then((dateSet) => (stateStore.rfResponseDates = Array.from(dateSet)))
      .then(() => console.log(stateStore.rfResponseDates));

    new StateService(url)
      .Get()
      .then((jres) => jres.list)
      .then((data: any) =>
        data.map((data: any) => new Map([[data.date, data.rtb_rem_gross]]))
      )
      .then((mapped) => Accumulate.AccumulateByDate(mapped))
      .then((res) => (stateStore.rfResponseGrossRev = res))
      .then(() => console.log(stateStore.rfResponseGrossRev));

    new StateService(url)
      .Get()
      .then((jres) => jres.list)
      .then((data: any) =>
        data.map((data: any) => new Map([[data.date, data.rtb_rem_imp_requests]]))
      )
      .then((mapped) => Accumulate.AccumulateByDate(mapped))
      .then((res) => (stateStore.rfResponseRequestedBids = res))
      .then(() => console.log(stateStore.rfResponseRequestedBids));

    new StateService(url)
      .Get()
      .then((jres) => jres.list)
      .then((data: any) =>
        data.map(
          (data: any) => new Map([[data.date, data.rtb_rem_imp_coverage]])
        )
      )
      .then((mapped) => Accumulate.AccumulateByDate(mapped))
      .then((res) => (stateStore.rfResponseBids = res))
      .then(() => console.log(stateStore.rfResponseBids));
  });

  useEffect(() => {
    setTimeout(() => {
      console.log("Chart already loaded");
      Highcharts.chart("container", {
        exporting: {
          enabled: false,
        },
        chart: {
          height: (4 / 16) * 100 + "%",
        },
        title: {
          text: "",
        },
        xAxis: {
          categories: Array.from(stateStore.rfResponseDates),
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
              text: "Gross Revenue",
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
            data: stateStore.rfResponseGrossRev,
            color: "#7DC87E",
            yAxis: 1,
            dataLabels: {
              format: "${y}",
              enabled: true,
            },
          },
          {
            type: "areaspline",
            name: "Requested Bids",
            color: "black",
            opacity: 0.60,
            data: stateStore.rfResponseRequestedBids,
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
            data: stateStore.rfResponseBids,
            marker: {
              lineWidth: 1,
            },
            label: {
              enabled: false,
            },
          },
        ],
      });
    }, 1750);
  }); //this is probably only a temporary fix

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
