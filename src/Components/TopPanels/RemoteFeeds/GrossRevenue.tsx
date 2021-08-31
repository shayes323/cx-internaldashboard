import { CircularProgress, Paper, Typography } from "@material-ui/core";
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
    Utils.FetchTotal(grossRevUrl)
      .then((total) => total.rtb_rem_gross)
      .then((data) => (stateStore.rfGrossRevenue = data))
      .then(() => stateStore.rfStatsFetching[0] = false);
  }, [stateStore.start, stateStore.end, stateStore.selectedRemotefeed, stateStore.page]);

  return (
    <Paper style={{ height: "100%" }}>

    {stateStore.rfStatsFetching[0] === true ? (
      <div className="spinner">
        <CircularProgress />
      </div>
    ) : (
      <>
      <div className="panelTitle">Estimated Gross Revenue:</div>
      <div className="panelInfo">{Utils.ToDollar(stateStore.rfGrossRevenue)}</div> </>)}
    </Paper>
  );
});
