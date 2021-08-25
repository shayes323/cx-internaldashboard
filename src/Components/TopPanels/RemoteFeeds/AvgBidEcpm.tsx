import { CircularProgress, Paper, Typography } from "@material-ui/core";
import { TurnedInNot } from "@material-ui/icons";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect } from "react";
import { StateService } from "../../../StateService";
import { stateStoreContext } from "../../../StateStore";
import { Utils } from "../../../Utils";

export const AvgBidEcpm = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);

  const avgBidEcpmUrl: string =
    stateStore.selectedRemotefeed === ""
      ? Utils.CreateUrl(
          "remotefeeds",
          stateStore.start,
          stateStore.end,
          "none",
          "none",
          "rtb_rem_top_bids_price_avg"
        )
      : Utils.CreateUrl(
          "remotefeeds",
          stateStore.start,
          stateStore.end,
          "remotefeed=" + stateStore.selectedRemotefeed,
          "none",
          "rtb_rem_top_bids_price_avg"
        );

  useEffect(() => {
    Utils.FetchTotal(avgBidEcpmUrl)
      .then((total) => total.rtb_rem_top_bids_price_avg)
      .then((data) => (stateStore.rfAvgBidEcpm = data))
      .then(() => stateStore.rfStatsFetching[3] = false);
  });

  return (
    <Paper style={{ height: "100%" }}>
       {stateStore.rfStatsFetching[3] === true ? (
        <div className="spinner">
          <CircularProgress />
        </div>
      ) : (
        <>
      <div className="panelTitle">Avg Bid ECPM:</div>
        <div className="panelInfo">{Utils.ToDollar(stateStore.rfAvgBidEcpm)}</div></>)}
    </Paper>
  );
});
