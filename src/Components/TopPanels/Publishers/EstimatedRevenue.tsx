import {
  CircularProgress,
  Paper,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect } from "react";
import { StateService } from "../../../StateService";
import { stateStoreContext } from "../../../StateStore";
import { Utils } from "../../../Utils";
import "../../Spinner.css";

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
          "rtb_pub_gross"
        )
      : Utils.CreateUrl(
          "publishers",
          stateStore.start,
          stateStore.end,
          "publisher=" + stateStore.selectedPublisher,
          "none",
          "rtb_pub_gross"
        );

  useEffect(() => {
    Utils.FetchTotal(estRevUrl)
      .then((total) => total.rtb_pub_gross)
      .then((data) => (stateStore.estimatedRevenue = data))
      .then(() => (stateStore.pubStatsFetching[0] = false));
  });


  return (
    <Paper style={{ height: "100%" }}>
      {stateStore.pubStatsFetching[0] === true ? (
        <div className="spinner">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="panelTitle">ESTIMATED PUB REVENUE:</div>
          <div className="panelInfo">
            {Utils.ToDollar(stateStore.estimatedRevenue)}
          </div>
        </>
      )}
    </Paper>
  );
});
