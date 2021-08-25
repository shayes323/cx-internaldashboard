import { CircularProgress, Paper, ThemeProvider, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect } from "react";
import { StateService } from "../../../StateService";
import { stateStoreContext } from "../../../StateStore";
import { Utils } from "../../../Utils";
import "../../Spinner.css";

export const Requests = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);

  const requestsUrl: string =
    stateStore.selectedPublisher === ""
      ? Utils.CreateUrl(
          "publishers",
          stateStore.start,
          stateStore.end,
          "none",
          "none",
          "rtb_pub_requests"
        )
      : Utils.CreateUrl(
          "publishers",
          stateStore.start,
          stateStore.end,
          "publisher=" + stateStore.selectedPublisher,
          "none",
          "rtb_pub_requests"
        );

  useEffect(() => {
    Utils.FetchTotal(requestsUrl)
      .then((total) => total.rtb_pub_requests)
      .then((data) => (stateStore.requests = data))
      .then(() => stateStore.pubStatsFetching[1] = false);
  });



  return (
    <Paper style={{ height: "100%" }}>
      {stateStore.pubStatsFetching[1] === true ? (
        <div className="spinner">
          <CircularProgress />
        </div>
      ) : (
        <>
      <div className="panelTitle">REQUESTS:</div>
      <div className="panelInfo">{Utils.ToFullNum(stateStore.requests)}</div>
      </>)}
    </Paper>
  );
});
