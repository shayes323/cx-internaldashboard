import { Paper, ThemeProvider, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect } from "react";
import { StateService } from "../StateService";
import { stateStoreContext } from "../StateStore";
import { theme } from "./Theme";

export const Requests = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);

  var today: any = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;

  var requestsUrl: string = stateStore.selectedPublisher === "" ?
    "https://dev-app-api.catapultx.com/api/v1/reports/publishers/all/" +
    stateStore.start +
    "/" +
    stateStore.end +
    "/" +
    "rtb_pub_requests" : "https://dev-app-api.catapultx.com/api/v1/reports/publishers/" +
    stateStore.start +
    "/" +
    stateStore.end +
    "/publisher=" +
    stateStore.selectedPublisher +
    "/rtb_pub_requests";

  useEffect(() => {
    new StateService(requestsUrl)
      .Get()
      .then((jres) => jres.total)
      .then((total) => total.rtb_pub_requests)
      .then((data) => (stateStore.requests = data));
  });

  return (
    <ThemeProvider theme={theme}>
    <Paper style={{ height: "100%" }}><Typography variant="subtitle1">REQUESTS:</Typography><div style={{textAlign: "center"}}><Typography variant="subtitle2">{stateStore.requests}</Typography></div></Paper>
    </ThemeProvider>
  );
});
