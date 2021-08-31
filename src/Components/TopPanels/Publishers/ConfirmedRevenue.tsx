import {
    CircularProgress,
    Paper,
    ThemeProvider,
    Typography,
  } from "@material-ui/core";
  import { observer } from "mobx-react-lite";
  import react, { useContext, useEffect } from "react";
  import { stateStoreContext } from "../../../StateStore";
  import { Utils } from "../../../Utils";
  import "../../Spinner.css";
  
  export const ConfirmedRevenue = observer<any, any>(() => {
    const stateStore = useContext(stateStoreContext);
  
    const estRevUrl: string =
      stateStore.selectedPublisher === ""
        ? Utils.CreateUrl(
            "publishers",
            stateStore.start,
            stateStore.end,
            "none",
            "none",
            "rtb_pub_revenue"
          )
        : Utils.CreateUrl(
            "publishers",
            stateStore.start,
            stateStore.end,
            "publisher=" + stateStore.selectedPublisher,
            "none",
            "rtb_pub_revenue"
          );
  
    useEffect(() => {
      console.log(estRevUrl);
      Utils.FetchTotal(estRevUrl)
        .then((total) => total.rtb_pub_revenue)
        .then((data) => (stateStore.confirmedRevenue = data))
        .then(() => (stateStore.pubStatsFetching[7] = false));
    });
  
  
    return (
      <Paper style={{ height: "100%" }}>
        {stateStore.pubStatsFetching[7] === true ? (
          <div className="spinner">
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className="panelTitle">CONFIRMED PUB REVENUE:</div>
            <div className="panelInfo">
              {Utils.ToDollar(stateStore.confirmedRevenue)}
            </div>
          </>
        )}
      </Paper>
    );
  });
  