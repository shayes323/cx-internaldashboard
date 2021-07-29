import { Paper, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect } from "react";
import { StateService } from "../../StateService";
import { stateStoreContext } from "../../StateStore";

export const Bids = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);


  const bidsUrl: string = stateStore.selectedRemotefeed === "" ?
    "https://dev-app-api.catapultx.com/api/v1/reports/remotefeeds/all/" +
    stateStore.start +
    "/" +
    stateStore.end +
    "/" +
    "rtb_rem_imp_coverage" : "https://dev-app-api.catapultx.com/api/v1/reports/remotefeeds/" +
    stateStore.start +
    "/" +
    stateStore.end +
    "/remotefeed=" +
    stateStore.selectedRemotefeed +
    "/rtb_rem_imp_coverage";

  useEffect(() => {
    new StateService(bidsUrl)
      .Get()
      .then((jres) => jres.total)
      .then((total) => total.rtb_rem_imp_coverage)
      .then((data) => (stateStore.rfBids = data))
  });

  return   <Paper style={{ height: "100%" }}><Typography variant="subtitle1">Bids:</Typography><div style={{textAlign: "center"}}><Typography variant="subtitle2">{stateStore.rfBids}</Typography></div></Paper>

});