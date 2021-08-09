import { Paper, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect } from "react";
import { StateService } from "../../../StateService";
import { stateStoreContext } from "../../../StateStore";
import { Utils } from "../../../Utils";

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
  });

  return (
    <Paper style={{ height: "100%" }}>
      <div className="panelTitle">
      WIN RATE:
      </div>
      <div className="panelInfo">
        {Utils.ToPercentage(stateStore.winRate)}
      </div>
    </Paper>
  );
});
