import { Paper, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect } from "react";
import { StateService } from "../../../StateService";
import { stateStoreContext } from "../../../StateStore";
import { Utils } from "../../../Utils";

export const GrossRevenue = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);

  const grossRevUrl: string =
    stateStore.selectedRemotefeed === ""
      ? Utils.CreateUrl(
          "remotefeeds",
          stateStore.start,
          stateStore.end,
          "none",
          "none",
          "rtb_rem_gross"
        )
      : Utils.CreateUrl(
          "remotefeeds",
          stateStore.start,
          stateStore.end,
          "remotefeed=" + stateStore.selectedRemotefeed,
          "none",
          "rtb_rem_gross"
        );

  useEffect(() => {
    new StateService(grossRevUrl)
      .Get()
      .then((jres) => jres.total)
      .then((total) => total.rtb_rem_gross)
      .then((data) => (stateStore.rfGrossRevenue = data));
  });

  return (
    <Paper style={{ height: "100%" }}>
      <div className="panelTitle">Gross Revenue:</div>
      <div className="panelInfo">{Utils.ToDollar(stateStore.rfGrossRevenue)}</div>
    </Paper>
  );
});
