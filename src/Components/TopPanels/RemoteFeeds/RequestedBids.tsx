import { Paper, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect } from "react";
import { StateService } from "../../../StateService";
import { stateStoreContext } from "../../../StateStore";
import { Utils } from "../../../Utils";

export const RequestedBids = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);

  const reqBidsUrl: string =
    stateStore.selectedRemotefeed === ""
      ? Utils.CreateUrl(
          "remotefeeds",
          stateStore.start,
          stateStore.end,
          "none",
          "none",
          "rtb_rem_imp_requests"
        )
      : Utils.CreateUrl(
          "remotefeeds",
          stateStore.start,
          stateStore.end,
          "remotefeed=" + stateStore.selectedRemotefeed,
          "none",
          "rtb_rem_imp_requests"
        );

  useEffect(() => {
    new StateService(reqBidsUrl)
      .Get()
      .then((jres) => jres.total)
      .then((total) => total.rtb_rem_imp_requests)
      .then((data) => (stateStore.rfRequestedBids = data));
  });

  return (
    <Paper style={{ height: "100%" }}>
      <div className="panelTitle">Requested Bids:</div>
      <div className="panelInfo">{stateStore.rfRequestedBids}</div>
    </Paper>
  );
});
