import { Paper, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect } from "react";
import { StateService } from "../../../StateService";
import { stateStoreContext } from "../../../StateStore";
import { Utils } from "../../../Utils";

export const Ecpm = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);

  const ecpmUrl: string =
    stateStore.selectedPublisher === ""
      ? Utils.CreateUrl(
          "publishers",
          stateStore.start,
          stateStore.end,
          "none",
          "none",
          "rtb_pub_ecpm"
        )
      : Utils.CreateUrl(
          "publishers",
          stateStore.start,
          stateStore.end,
          "publisher=" + stateStore.selectedPublisher,
          "none",
          "rtb_pub_ecpm"
        );

  useEffect(() => {
    Utils.FetchTotal(ecpmUrl)
      .then((total) => total.rtb_pub_ecpm)
      .then((data) => (stateStore.ecpm = data));
  });

  return (
    <Paper style={{ height: "100%" }}>
      <div className="panelTitle">ECPM:</div>
      <div className="panelInfo">{Utils.RoundNum(stateStore.ecpm)}</div>
    </Paper>
  );
});
