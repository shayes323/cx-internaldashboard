import { CircularProgress, Paper, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect } from "react";
import { StateService } from "../../../StateService";
import { stateStoreContext } from "../../../StateStore";
import { Utils } from "../../../Utils";
import "../../Spinner.css";


export const WinRate = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);

  const winRateUrl: string =
    stateStore.selectedPublisher === ""
      ? Utils.CreateUrl(
          "publishers",
          stateStore.start,
          stateStore.end,
          "none",
          "none",
          "rtb_pub_win_rate"
        )
      : Utils.CreateUrl(
          "publishers",
          stateStore.start,
          stateStore.end,
          "publisher=" + stateStore.selectedPublisher,
          "none",
          "rtb_pub_win_rate"
        );

  useEffect(() => {
    Utils.FetchTotal(winRateUrl)
      .then((total) => total.rtb_pub_win_rate)
      .then((data) => (stateStore.winRate = data))
      .then(() => (stateStore.pubStatsFetching[4] = false))
  });


  return (
    <Paper style={{ height: "100%" }}>
      {stateStore.pubStatsFetching[4] === true ? (
        <div className="spinner">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="panelTitle">WIN RATE:</div>
          <div className="panelInfo">
            {Utils.ToPercentage(stateStore.winRate)}
          </div>
        </>
      )}
    </Paper>
  );
});
