import { Box, CircularProgress, Paper } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import Highcharts from "highcharts";
import { useContext, useEffect, useRef, useState } from "react";
import "./PieChart.css";
import { Utils } from "../Utils";
import { stateStoreContext } from "../StateStore";
import { ChartData } from "../ChartData";
import { toJS } from "mobx";
import { CreateTrafficChart } from "./CreateChart";
import { trace } from "mobx";
import "./Spinner.css";

interface Custom extends Highcharts.PointOptionsObject {
  bids?: number;
  avgEcpm?: number;
}

export const PieChart: any = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);
  const [ready, setReady] = useState<boolean>();
  var url: string;
  if (stateStore.page === "publishers") {
    stateStore.selectedPublisher === ""
      ? (url = Utils.CreateUrl(
          "publishers",
          stateStore.start,
          stateStore.end,
          "none",
          "device_type",
          "all"
        ))
      : (url = Utils.CreateUrl(
          "publishers",
          stateStore.start,
          stateStore.end,
          "publisher=" + stateStore.selectedPublisher,
          "device_type",
          "all"
        ));
  } else if (stateStore.page === "remote feeds") {
    stateStore.selectedRemotefeed === ""
      ? (url = Utils.CreateUrl(
          "remotefeeds",
          stateStore.start,
          stateStore.end,
          "none",
          "imp_type",
          "all"
        ))
      : (url = Utils.CreateUrl(
          "remotefeeds",
          stateStore.start,
          stateStore.end,
          "remotefeed=" + stateStore.selectedRemotefeed,
          "imp_type",
          "all"
        ));
  }

  useEffect(() => {
    stateStore.pieChartReady = false;
    if (stateStore.page === "publishers") {
      ChartData.GetDeviceCounts(url)
        .then((data) => (stateStore.pubPieChartData = data))
        .then(() => (stateStore.pieChartReady = true));
    } else if (stateStore.page === "remote feeds") {
      ChartData.GetTrafficCounts(url)
        .then((data) => (stateStore.rfPieChartData = data))
        .then(() => (stateStore.pieChartReady = true));
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
      if (typeof element != "undefined" && element != null) {
        setReady(true);
      } else {
        setReady(false);
      }
    }, 100);
  };

  checkExist();
  useEffect(() => {
    if (stateStore.page === "publishers") {
      CreateDeviceChart(0, 0, 0, 0, 0, 0, 0, 1);
    }
    if (stateStore.page === "remote feeds") {
      CreateTrafficChart(0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1);
    }
  }, []);

  useEffect(() => {
    if (ready) {
      if (stateStore.page === "publishers") {
        CreateDeviceChart(
          stateStore.pubPieChartData[0],
          stateStore.pubPieChartData[1],
          stateStore.pubPieChartData[2],
          stateStore.pubPieChartData[3],
          stateStore.pubPieChartData[4],
          stateStore.pubPieChartData[5],
          stateStore.pubPieChartData[6],
          stateStore.pubPieChartData[7]
        );
        stateStore.pageLoading[2] = false;
      } else if (stateStore.page === "remote feeds") {
        CreateTrafficChart(
          stateStore.rfPieChartData[0],
          stateStore.rfPieChartData[1],
          stateStore.rfPieChartData[2],
          stateStore.rfPieChartData[3],
          stateStore.rfPieChartData[4],
          stateStore.rfPieChartData[5],
          stateStore.rfPieChartData[6],
          stateStore.rfPieChartData[7],
          stateStore.rfPieChartData[8],
          stateStore.rfPieChartData[9],
          stateStore.rfPieChartData[10]
        );
        console.log(stateStore.selectedRemotefeed);
        console.log(stateStore.rfPieChartData);
        stateStore.pageLoading[2] = false;
      }
    }
  }, [stateStore.rfPieChartData, stateStore.pubPieChartData]);

  function CreateDeviceChart(
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
        events: {
          load() {
            const chart = this;
            chart.showLoading("Loading...");
            setInterval(function () {
              if (stateStore.pageLoading[2] === false) {
                chart.hideLoading();
              }
            }, 1000);
          },
        },
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
        animation: false,
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


  function CreateTrafficChart(
    bannerCounts: number,
    videoCounts: number,
    nativeCounts: number,
    ovrCounts: number,
    bannerBids: number,
    videoBids: number,
    nativeBids: number,
    bannerEcpm: number,
    videoEcpm: number,
    nativeEcpm: number,
    ovrEcpm: number
  ) {
    return Highcharts.chart("pieContainer", {
      chart: {
        events: {
          load() {
            const chart = this;
            chart.showLoading("Loading...");
            setInterval(function () {
              if (stateStore.pageLoading[2] === false) {
                chart.hideLoading();
              }
            }, 1000);
          },
        },
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie"
      },
      title: {
        text: "TRAFFIC BREAKDOWN",
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",

        // formatOptions
        // formatter: function () {
        //   var custom = this.point.options as Custom;
        //   var orig  = "{series.name}: <b>{point.percentage:.1f}%</b>" + "{point.bids}";
        //   orig = orig +`${custom.bids}`;
        //   orig = orig + `${custom.avgEcpm}`;
        //   return orig;
        // }
        
        //   "{series.name}: <b>{point.percentage:.1f}%</b>" + "{point.bids}",
        // formatter: function() {
        //     var orig = "{series.name}: <b>{point.percentage:.1f}%</b>";
        //     orig + this.point.bids;
        // return orig + this.point.avgEcpm;

        // }
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
          dataGrouping: { enabled: false },
          name: "Device Type",
          colorByPoint: true,
          data: [
            {
              name: "Banner",
              y: bannerCounts / ovrCounts,
              // bids: bannerBids,
              // avgEcpm: bannerEcpm / ovrEcpm,
            },
            {
              name: "Video",
              y: videoCounts / ovrCounts,
              // bids: videoBids,
              // avgEcpm: videoEcpm / ovrEcpm,
            },

            {
              name: "Native",
              y: nativeCounts / ovrCounts,
              // bids: nativeBids,
              // avgEcpm: nativeEcpm / ovrEcpm,
            },
          ],

          // {
          //   name: "Banner Bids",
          //   y: bannerBids / overallBids,
          //   visible: false,
          // },
          // {
          //   name: "Native Bids",
          //   y: nativeBids / overallBids,
          //   // visible: false,
          // },
          // {
          //   name: "Video Bids",
          //   y: videoBids / overallBids,
          //   // visible: false
          //,
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

  return (
    <Box m={2} style={{ marginTop: "-3px", marginLeft: "-3px" }}>
      <Paper className="container" style={{ height: "364px" }}>
        {ready === false && (
          <div className="overlay-spinner">
            <CircularProgress />
          </div>
        )}
        <div className="chart" id="pieContainer"></div>
      </Paper>
    </Box>
  );
});
