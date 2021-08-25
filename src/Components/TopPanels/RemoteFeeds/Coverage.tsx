import { CircularProgress, Paper, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect } from "react";
import { StateService } from "../../../StateService";
import { stateStoreContext } from "../../../StateStore";
import { Utils } from "../../../Utils";

export const Coverage = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);

  const coverageUrl: string =
    stateStore.selectedRemotefeed === ""
      ? Utils.CreateUrl(
          "remotefeeds",
          stateStore.start,
          stateStore.end,
          "none",
          "none",
          "rtb_rem_coverage_rate"
        )
      : Utils.CreateUrl(
          "remotefeeds",
          stateStore.start,
          stateStore.end,
          "remotefeed=" + stateStore.selectedRemotefeed,
          "none",
          "rtb_rem_coverage_rate"
        );

  useEffect(() => {
    Utils.FetchTotal(coverageUrl)
      .then((total) => total.rtb_rem_coverage_rate)
      .then((data) => (stateStore.rfCoverage = data))
      .then(() => (stateStore.rfStatsFetching[4] = false));
  });

  return (
    <Paper style={{ height: "100%" }}>
      {stateStore.rfStatsFetching[3] === true ? (
        <div className="spinner">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="panelTitle">Coverage:</div>
          <div className="panelInfo">
            {Utils.ToPercentage(stateStore.rfCoverage)}
          </div>
        </>
      )}
    </Paper>
  );
});
