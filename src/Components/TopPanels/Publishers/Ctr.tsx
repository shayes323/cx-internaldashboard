import { Paper, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect } from "react";
import { StateService } from "../../../StateService";
import { stateStoreContext } from "../../../StateStore";
import { Utils } from "../../../Utils";
import '../TopPanels.css';

export const Ctr = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);

  const ctrUrl: string =
    stateStore.selectedPublisher === ""
      ? Utils.CreateUrl(
          "publishers",
          stateStore.start,
          stateStore.end,
          "none",
          "none",
          "rtb_pub_ctr"
        )
      : Utils.CreateUrl(
          "publishers",
          stateStore.start,
          stateStore.end,
          "publisher=" + stateStore.selectedPublisher,
          "none",
          "rtb_pub_ctr"
        );

  console.log(ctrUrl);
  useEffect(() => {
    Utils.FetchTotal(ctrUrl)
      .then((total) => total.rtb_pub_ctr)
      .then((data) => (stateStore.ctr = data));
  });
  return (
    <Paper style={{ height: "100%" }}>
      <div className="panelTitle">
      CTR:
      </div>
      <div className = "panelInfo">
        {Utils.ToPercentage(stateStore.ctr)}
      </div>
    </Paper>
  );
});
