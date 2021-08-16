import Highcharts from "highcharts";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { stateStoreContext } from "../StateStore";
import { Utils } from "../Utils";

export function CreatePubChart(
  responseDates: any,
  responseRevenue: any[],
  responseRequests: any[],
  responseImpressions: any[]
) {

  Highcharts.setOptions({
    lang: {
      thousandsSep: ','
    }
  });
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
        name: "Revenue",
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

export function CreateRFChart(
  responseDates: any,
  responseGrossRev: any[],
  responseReqBids: any[],
  responseBids: any[]
) {

    Highcharts.setOptions({
    lang: {
      thousandsSep: ','
    }
  });


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
          // formatter: function () {
          //     return Highcharts.numberFormat(this.value, 0, "", ",");
          //   },
          

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

export function CreateDeviceChart(
  unknown: number,
  other: number,
  mobile: number,
  desktop: number,
  tv: number,
  tablet: number,
  gameConsole: number,
  overall: number
) {
  return Highcharts.chart("pieContainer", {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "DEVICE BREAKDOWN",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
        showInLegend: true,
      },
    },
    series: [
      {
        type: "pie",
        name: "Device Type",
        colorByPoint: true,
        data: [
          {
            name: "Unknown",
            y: unknown / overall,
            // sliced: true,
            selected: true,
          },
          {
            name: "Other",
            y: other / overall,
          },
          {
            name: "Mobile",
            y: mobile / overall,
          },
          {
            name: "Desktop",
            y: desktop / overall,
          },
          {
            name: "TV",
            y: tv / overall,
          },
          {
            name: "Tablet",
            y: tablet / overall,
          },
          {
            name: "Game Console",
            y: gameConsole / overall,
          },
        ],
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 300,
          },
          chartOptions: {
            legend: {
              align: "center",
              verticalAlign: "bottom",
              layout: "horizontal",
            },
            yAxis: {
              labels: {
                align: "left",
                x: 0,
                y: -5,
              },
              title: {
                text: null,
              },
            },
            subtitle: {
              text: null,
            },
            credits: {
              enabled: false,
            },
          },
        },
      ],
    },
  });
}

export function CreateTrafficChart(
  banner: number,
  video: number,
  native: number,
  overall: number
) {
  return Highcharts.chart("pieContainer", {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "TRAFFIC BREAKDOWN",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
        showInLegend: true,
      },
    },
    series: [
      {
        type: "pie",
        name: "Device Type",
        colorByPoint: true,
        data: [
          {
            name: "Banner",
            y: banner / overall,
            // sliced: true,
            selected: true,
          },
          {
            name: "Video",
            y: video / overall,
          },
          {
            name: "Native",
            y: native / overall,
          },
        ],
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 300,
          },
          chartOptions: {
            legend: {
              align: "center",
              verticalAlign: "bottom",
              layout: "horizontal",
            },
            yAxis: {
              labels: {
                align: "left",
                x: 0,
                y: -5,
              },
              title: {
                text: null,
              },
            },
            subtitle: {
              text: null,
            },
            credits: {
              enabled: false,
            },
          },
        },
      ],
    },
  });
}
