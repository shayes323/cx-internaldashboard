import { Paper, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect } from "react";
import { StateService } from "../StateService";
import { stateStoreContext } from "../StateStore";
import { Num } from "./Num";

export const WinRate = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);


  const winRateUrl: string = stateStore.selectedPublisher === "" ?
    "https://dev-app-api.catapultx.com/api/v1/reports/publishers/all/" +
    stateStore.start +
    "/" +
    stateStore.end +
    "/" +
    "rtb_pub_win_rate" : "https://dev-app-api.catapultx.com/api/v1/reports/publishers/" +
    stateStore.start +
    "/" +
    stateStore.end +
    "/publisher=" +
    stateStore.selectedPublisher +
    "/rtb_pub_win_rate";

  useEffect(() => {
    new StateService(winRateUrl)
      .Get()
      .then((jres) => jres.total)
      .then((total) => total.rtb_pub_win_rate)
      .then((data) => (stateStore.winRate = data))
  });

  return   <Paper style={{ height: "100%" }}><Typography variant="subtitle1">WIN RATE:</Typography><div style={{textAlign: "center"}}><Typography variant="subtitle2">{Num.RoundNum(stateStore.winRate)}</Typography></div></Paper>

});