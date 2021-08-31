import { CircularProgress, Paper, Typography } from "@material-ui/core";
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
    Utils.FetchTotal(reqBidsUrl)
      .then((total) => total.rtb_rem_imp_requests)
      .then((data) => (stateStore.rfRequestedBids = data))
      .then(() => (stateStore.rfStatsFetching[1] = false));
  }, [stateStore.start, stateStore.end, stateStore.selectedRemotefeed, stateStore.page]);

  return (
    <Paper style={{ height: "100%" }}>
      {stateStore.rfStatsFetching[1] === true ? (
        <div className="spinner">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="panelTitle">Requested Bids:</div>
          <div className="panelInfo">{Utils.ToFullNum(stateStore.rfRequestedBids)}</div>
        </>
      )}
    </Paper>
  );
});
