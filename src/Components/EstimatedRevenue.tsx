import { Paper, ThemeProvider, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect } from "react";
import { StateService } from "../StateService";
import { stateStoreContext } from "../StateStore";
import { Num } from "./Num";
import { theme } from "./Theme";

export const EstimatedRevenue = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);

  const estRevUrl: string = stateStore.selectedPublisher === "" ?
    "https://dev-app-api.catapultx.com/api/v1/reports/publishers/all/" +
    stateStore.start +
    "/" +
    stateStore.end +
    "/" +
    "rtb_rem_gross" : "https://dev-app-api.catapultx.com/api/v1/reports/publishers/" +
    stateStore.start +
    "/" +
    stateStore.end +
    "/publisher=" +
    stateStore.selectedPublisher +
    "/rtb_rem_gross";


  useEffect(() => {
    new StateService(estRevUrl)
      .Get()
      .then((jres) => jres.total)
      .then((total) => total.rtb_rem_gross)
      .then((data) => (stateStore.estimatedRevenue = data))
  });

  return <Paper style={{ height: "100%" }}><ThemeProvider theme={theme}><Typography variant="subtitle1">ESTIMATED REVENUE:</Typography><div style={{textAlign: "center"}}><Typography variant="body1">{Num.RoundNum(stateStore.estimatedRevenue)}</Typography></div></ThemeProvider></Paper>
});
