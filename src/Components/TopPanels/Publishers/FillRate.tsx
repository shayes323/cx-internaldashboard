import { CircularProgress, Paper, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect } from "react";
import { StateService } from "../../../StateService";
import { stateStoreContext } from "../../../StateStore";
import { Utils } from "../../../Utils";
import "../../Spinner.css";


export const FillRate = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);

  const fillRateUrl: string =
    stateStore.selectedPublisher === ""
      ? Utils.CreateUrl(
          "publishers",
          stateStore.start,
          stateStore.end,
          "none",
          "none",
          "rtb_pub_impressions,rtb_pub_requests"
        )
      : Utils.CreateUrl(
          "publishers",
          stateStore.start,
          stateStore.end,
          "publisher=" + stateStore.selectedPublisher,
          "none",
          "rtb_pub_impressions,rtb_pub_requests"
        );

  useEffect(() => {
    Utils.FetchTotal(fillRateUrl)
      .then((obj) => Object.keys(obj).map((key) => obj[key]))
      .then((arr) => (stateStore.fillRateData = arr))
      .then(
        () =>
          (stateStore.fillRate =
            stateStore.fillRateData[0] / (stateStore.fillRateData[1] / 2))
      )
      .then(() => stateStore.pubStatsFetching[2] = false);
  });

  return (
    <Paper style={{ height: "100%" }}>
      {stateStore.pubStatsFetching[2] === true ? (
        <div className="spinner">
          <CircularProgress />
        </div>
      ) : (
        <>
      <div className="panelTitle">
      FILL RATE:
      </div>
      <div className="panelInfo">
        {Utils.ToPercentage(stateStore.fillRate)}
      </div>
      </>)}
    </Paper>
  );
});
