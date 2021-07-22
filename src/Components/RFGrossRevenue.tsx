import { Paper, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect } from "react";
import { StateService } from "../StateService";
import { stateStoreContext } from "../StateStore";

export const RFGrossRevenue = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);

  const rfGrossRevUrl: string = stateStore.selectedRemotefeed === "" ?
    "https://dev-app-api.catapultx.com/api/v1/reports/remotefeeds/all/" +
    stateStore.start +
    "/" +
    stateStore.end +
    "/" +
    "rtb_rem_gross" : "https://dev-app-api.catapultx.com/api/v1/reports/remotefeeds/" +
    stateStore.start +
    "/" +
    stateStore.end +
    "/remotefeeds=" +
    stateStore.selectedRemotefeed+
    "/rtb_rem_gross";

  useEffect(() => {
    new StateService(rfGrossRevUrl)
      .Get()
      .then((jres) => jres.total)
      .then((total) => total.rtb_rem_gross)
      .then((data) => (stateStore.rfGrossRevenue = data))
  });

  return   <Paper style={{ height: "100%" }}><Typography variant="subtitle1">Gross Revenue:</Typography><div style={{textAlign: "center"}}><Typography variant="subtitle2">{stateStore.rfGrossRevenue}</Typography></div></Paper>

});