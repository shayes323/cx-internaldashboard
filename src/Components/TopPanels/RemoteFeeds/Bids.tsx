import { CircularProgress, Paper, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect } from "react";
import { StateService } from "../../../StateService";
import { stateStoreContext } from "../../../StateStore";
import { Utils } from "../../../Utils";

export const Bids = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);


  console.log(stateStore.rfStatsFetching);

  const bidsUrl: string =
    stateStore.selectedRemotefeed === ""
      ? Utils.CreateUrl(
          "remotefeeds",
          stateStore.start,
          stateStore.end,
          "none",
          "none",
          "rtb_rem_imp_coverage"
        )
      : Utils.CreateUrl(
          "remotefeeds",
          stateStore.start,
          stateStore.end,
          "remotefeed=" + stateStore.selectedRemotefeed,
          "none",
          "rtb_rem_imp_coverage"
        );

    

  useEffect(() => {
    console.log(bidsUrl);
    Utils.FetchTotal(bidsUrl)
      .then((total) => total.rtb_rem_imp_coverage)
      .then((data) => (stateStore.rfBids = data))
      .then(() => stateStore.rfStatsFetching[2] = false);
  }, [stateStore.start, stateStore.end, stateStore.selectedRemotefeed, stateStore.page]);

  return (
    <Paper style={{ height: "100%" }}>
      {stateStore.rfStatsFetching[2] === true ? (
        <div className="spinner">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="panelTitle">Bids:</div>
          <div className="panelInfo">{Utils.ToFullNum(stateStore.rfBids)}</div>{" "}
        </>
      )}
    </Paper>
  );
});
