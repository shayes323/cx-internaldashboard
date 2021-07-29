import Highcharts from "highcharts";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { AnonymousSubject } from "rxjs/internal/Subject";
import { stateStoreContext } from "../StateStore";

export function CreatePubChart(responseDates: any, responseRevenue: any[], responseRequests: any[], responseImpressions: any[]){
    return Highcharts.chart("container", {
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
          data: responseRevenue,
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


  export function CreateRFChart(responseDates: any, responseGrossRev: any[], responseReqBids: any[], responseBids: any[]) {
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
        categories: Array.from(responseDates)
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
          data: responseGrossRev,
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


