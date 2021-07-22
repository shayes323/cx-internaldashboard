import { Paper, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect } from "react";
import { StateService } from "../StateService";
import { stateStoreContext } from "../StateStore";

export const RFAvgBidEcpm = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);


  const rfAvgBidEcpmUrl: string = stateStore.selectedRemotefeed === "" ?
    "https://dev-app-api.catapultx.com/api/v1/reports/remotefeeds/all/" +
    stateStore.start +
    "/" +
    stateStore.end +
    "/" +
    "rtb_rem_top_bids_price_avg" : "https://dev-app-api.catapultx.com/api/v1/reports/remotefeeds/" +
    stateStore.start +
    "/" +
    stateStore.end +
    "/remotefeed=" +
    stateStore.selectedRemotefeed +
    "/rtb_rem_top_bids_price_avg";

  useEffect(() => {
    new StateService(rfAvgBidEcpmUrl)
      .Get()
      .then((jres) => jres.total)
      .then((total) => total.rtb_rem_top_bids_price_avg)
      .then((data) => (stateStore.rfAvgBidEcpm = data))
  });

  return   <Paper style={{ height: "100%" }}><Typography variant="subtitle1">Avg Bid ECPM:</Typography><div style={{textAlign: "center"}}><Typography variant="subtitle2">{stateStore.rfAvgBidEcpm}</Typography></div></Paper>

});