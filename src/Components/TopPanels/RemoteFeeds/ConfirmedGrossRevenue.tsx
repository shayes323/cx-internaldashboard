import { CircularProgress, Paper, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect } from "react";
import { StateService } from "../../../StateService";
import { stateStoreContext } from "../../../StateStore";
import { Utils } from "../../../Utils";

export const ConfirmedGrossRevenue = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);

  const grossRevUrl: string =
    stateStore.selectedRemotefeed === ""
      ? Utils.CreateUrl(
          "remotefeeds",
          stateStore.start,
          stateStore.end,
          "none",
          "none",
          "rtb_pub_revenue"
        )
      : Utils.CreateUrl(
          "remotefeeds",
          stateStore.start,
          stateStore.end,
          "remotefeed=" + stateStore.selectedRemotefeed,
          "none",
          "rtb_pub_revenue"
        );

  useEffect(() => {
    Utils.FetchTotal(grossRevUrl)
      .then((total) => total.rtb_pub_revenue)
      .then((data) => (stateStore.rfConfirmedGrossRevenue = data))
      .then(() => stateStore.rfStatsFetching[5] = false);
  });

  return (
    <Paper style={{ height: "100%" }}>

    {stateStore.rfStatsFetching[5] === true ? (
      <div className="spinner">
        <CircularProgress />
      </div>
    ) : (
      <>
      <div className="panelTitle">Confirmed Gross Revenue:</div>
      <div className="panelInfo">{Utils.ToDollar(stateStore.rfConfirmedGrossRevenue)}</div> </>)}
    </Paper>
  );
});