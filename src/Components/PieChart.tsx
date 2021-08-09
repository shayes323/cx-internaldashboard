import { Box, Paper } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import Highcharts from "highcharts";
import { useContext, useEffect, useRef, useState } from "react";
import "./PieChart.css";
import { Utils } from "../Utils";
import { stateStoreContext } from "../StateStore";
import { ChartData } from "../ChartData";
import { toJS } from "mobx";
import {
  SettingsInputAntennaTwoTone,
  SystemUpdateTwoTone,
} from "@material-ui/icons";
import { CreateDeviceChart, CreateTrafficChart } from "./CreateChart";
import { trace } from "mobx";

export const PieChart: any = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);
  var url: string;
  if (stateStore.page === "publishers") {
    stateStore.selectedPublisher === ""
      ? url = Utils.CreateUrl(
          "publishers",
          stateStore.start,
          stateStore.end,
          "none",
          "device_type",
          "all"
        )
      : url = Utils.CreateUrl(
          "publishers",
          stateStore.start,
          stateStore.end,
          "publisher=" + stateStore.selectedPublisher,
          "device_type",
          "all"
        );
  }
  else if (stateStore.page === "remote feeds") {
    stateStore.selectedRemotefeed === ""
    ? url = Utils.CreateUrl(
        "remotefeeds",
        stateStore.start,
        stateStore.end,
        "none",
        "imp_type",
        "all"
      )
    : url = Utils.CreateUrl(
        "remotefeeds",
        stateStore.start,
        stateStore.end,
        "remotefeed=" + stateStore.selectedRemotefeed,
        "imp_type",
        "all"
      );
  }

  useEffect(() => {
    if (stateStore.page === "publishers") {
      CreateDeviceChart(0, 0, 0, 0, 0, 0, 0, 1);
      console.log("empty hit");
    }
    else if (stateStore.page === "remote feeds") {
      CreateTrafficChart(0, 0, 0, 1);
    }
  }, []);

  useEffect(() => {
    if (stateStore.page === "publishers") {
    ChartData.GetDeviceCounts(url).then(
      (data) => (stateStore.pubPieChartData = data)
    );
    } else if (stateStore.page === "remote feeds") {
      ChartData.GetTrafficCounts(url).then(
        (data) => (stateStore.rfPieChartData = data))
    }
  });


  useEffect(() => {
    setTimeout(() => {
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
      }
      else if (stateStore.page === "remote feeds") {
        CreateTrafficChart(
          stateStore.rfPieChartData[0],
          stateStore.rfPieChartData[1],
          stateStore.rfPieChartData[2],
          stateStore.rfPieChartData[3],
        )
        console.log(stateStore.selectedRemotefeed);
        console.log(stateStore.rfPieChartData);
      }
    }, 2500);
  });

  // var counts = useRef([]);
  // GetDeviceCounts(url);
  // // var reloadReady = stateStore.pieChartReload;
  // if (counts.current !== []) {
  //   var [unknown, other, mobile, desktop, tablet, tv, gameConsole, overall] =
  //     counts.current;
  //   CreatePieChart(
  //     unknown,
  //     other,
  //     mobile,
  //     desktop,
  //     tablet,
  //     tv,
  //     gameConsole,
  //     overall
  //   );
  //   console.log("function fired");
  // }
  // console.log(firstRender);
  // useEffect(() => {
  //   console.log(counts.current)
  //   CreatePieChart(
  //     unknown,
  //     other,
  //     mobile,
  //     desktop,
  //     tablet,
  //     tv,
  //     gameConsole,
  //     overall
  //   );
  // }, []);

  // if (stateStore.pieChartReload) {
  //   console.log("CreatePieChart called")
  //   CreatePieChart(unknown, other, mobile, desktop, tablet, tv, gameConsole, overall);
  //   (console.log("second if hit"))
  // }

  return (
    <Box m={2} style={{ marginTop: "-3px", marginLeft: "-3px" }}>
      <Paper style={{ height: "363px" }}>
        <div id="pieContainer"></div>
      </Paper>
    </Box>
  );
});
