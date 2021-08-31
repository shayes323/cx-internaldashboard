import { CircularProgress, Paper, Typography } from "@material-ui/core";
import {
  SettingsInputAntenna,
  SettingsInputAntennaTwoTone,
} from "@material-ui/icons";
import { autorun, toJS } from "mobx";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect, useState } from "react";
import { StateService } from "../../../StateService";
import { stateStoreContext } from "../../../StateStore";
import { Utils } from "../../../Utils";
import "../TopPanels.css";
import "../../Spinner.css";

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

  useEffect(
    () => {
        Utils.FetchTotal(ctrUrl)
          .then((total) => total.rtb_pub_ctr)
          .then((data) => (stateStore.ctr = data))
          .then(() => (stateStore.pubStatsFetching[6] = false))
          .then(() => console.log("api hit"));
      },
    [
      stateStore.start,
      stateStore.end,
      stateStore.page,
      stateStore.selectedPublisher,
      stateStore.pubStatsFetching,
    ]
);

  return (
    <Paper style={{ height: "100%" }} >
      {toJS(stateStore.pubStatsFetching[6]) === false ? (
        <>
          <div className="panelTitle">CTR:</div>
          <div className="panelInfo">{Utils.ToPercentage(stateStore.ctr)}</div>
        </>
      ) : (
        <div className="spinner">
          <CircularProgress />
        </div>
      )}
    </Paper>
  );
});
