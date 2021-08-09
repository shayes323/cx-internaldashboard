import { Paper, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect } from "react";
import { StateService } from "../../../StateService";
import { stateStoreContext } from "../../../StateStore";
import { Utils } from "../../../Utils";

export const Impressions = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);

  const impUrl: string =
    stateStore.selectedPublisher === ""
      ? Utils.CreateUrl(
          "publishers",
          stateStore.start,
          stateStore.end,
          "none",
          "none",
          "rtb_pub_impressions"
        )
      : Utils.CreateUrl(
          "publishers",
          stateStore.start,
          stateStore.end,
          "publisher=" + stateStore.selectedPublisher,
          "none",
          "rtb_pub_impressions"
        );

  useEffect(() => {
    Utils.FetchTotal(impUrl)
      .then((total) => total.rtb_pub_impressions)
      .then((data) => (stateStore.impressions = data));
  });

  return (
    <Paper style={{ height: "100%" }}>
      <div className="panelTitle">
      IMPRESSIONS:
      </div>
      <div className="panelInfo">{stateStore.impressions}</div>
    </Paper>
  );
});
