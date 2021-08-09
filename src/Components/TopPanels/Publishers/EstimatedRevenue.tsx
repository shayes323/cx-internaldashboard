import { Paper, ThemeProvider, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect } from "react";
import { StateService } from "../../../StateService";
import { stateStoreContext } from "../../../StateStore";
import { Utils } from "../../../Utils";
// import { theme } from "../../Theme";

export const EstimatedRevenue = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);

  const estRevUrl: string =
    stateStore.selectedPublisher === ""
      ? Utils.CreateUrl(
          "publishers",
          stateStore.start,
          stateStore.end,
          "none",
          "none",
          "rtb_rem_gross"
        )
      : Utils.CreateUrl(
          "publishers",
          stateStore.start,
          stateStore.end,
          "publisher=" + stateStore.selectedPublisher,
          "none",
          "rtb_rem_gross"
        );

  useEffect(() => {
    Utils.FetchTotal(estRevUrl)
      .then((total) => total.rtb_rem_gross)
      .then((data) => (stateStore.estimatedRevenue = data))
  });

  return (
    <Paper style={{ height: "100%" }}>
      <div className="panelTitle">
      ESTIMATED REVENUE:
      </div>
      <div className="panelInfo">
        {Utils.ToDollar(stateStore.estimatedRevenue)}
      </div>
    </Paper>
  );
});
