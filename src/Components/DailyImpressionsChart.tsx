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

//need to get dates in the proper order
export const DailyImpressionsChart: any = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  var url = 
    "https://dev-app-api.catapultx.com/api/v1/reports/publishers/all/" +
    stateStore.start +
    "/" +
    stateStore.end +
    "/rtb_pub_impressions,rtb_pub_requests,rtb_pub_revenue";

  useEffect(() => {
    new StateService(url)
      .Get()
      .then((jres) => jres.list)
      .then((data: any) =>
        data.map((data: any) => new DateFormatter(data.date).format())
      )
      .then((dates) => new Set<any>(dates))
      .then((dateSet) => (stateStore.responseDates = Array.from(dateSet)))
      .then(() => console.log(stateStore.responseDates));

    new StateService(url)
      .Get()
      .then((jres) => jres.list)
      .then((data: any) =>
        data.map((data: any) => new Map([[data.date, data.rtb_pub_revenue]]))
      )
      .then((mapped) => Accumulate.AccumulateByDate(mapped))
      .then((res) => (stateStore.responseRevenue = res))
      .then(() => console.log(stateStore.responseRevenue));


    new StateService(url)
      .Get()
      .then((jres) => jres.list)
      .then((data: any) =>
        data.map((data: any) => new Map([[data.date, data.rtb_pub_requests]]))
      )
      .then((mapped) => Accumulate.AccumulateByDate(mapped))
      .then((res) => (stateStore.responseRequests = res))
      .then(() => console.log(stateStore.responseRequests));


    new StateService(url)
      .Get()
      .then((jres) => jres.list)
      .then((data: any) =>
        data.map(
          (data: any) => new Map([[data.date, data.rtb_pub_impressions]])
        )
      )
      .then((mapped) => Accumulate.AccumulateByDate(mapped))
      .then((res) => (stateStore.responseImpressions = res))
      .then(() => console.log(stateStore.responseImpressions))
  });


  useEffect(() => {
    setTimeout(() => {
    console.log("Chart already loaded")
    Highcharts.chart("container", {
      exporting: {
        enabled: false,
      },
      title: {
        text: "",
      },
      xAxis: {
        categories: Array.from(stateStore.responseDates),
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
            text: "Revenue",
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
          name: "Revenue",
          data: stateStore.responseRevenue,
          color: "#7DC87E",
          yAxis: 1,
          dataLabels: {
            format: "${y}",
            enabled: true,
          },
        },
        {
          type: "areaspline",
          name: "Requests",
          color: "black",
          data: stateStore.responseRequests,
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
          data: stateStore.responseImpressions,
          marker: {
            lineWidth: 1,
          },
          label: {
            enabled: false,
          },
        },
      ],
    });   
  }, 1750)}) //this is probably only a temporary fix


  return (
    <div>
      <div id="container"></div>
    </div>
  );
});
