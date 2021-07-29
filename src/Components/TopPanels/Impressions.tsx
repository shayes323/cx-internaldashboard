import { Paper, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect } from "react";
import { StateService } from "../../StateService";
import { stateStoreContext } from "../../StateStore";

export const Impressions = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);

  const impUrl: string = stateStore.selectedPublisher === "" ?
    "https://dev-app-api.catapultx.com/api/v1/reports/publishers/all/" +
    stateStore.start +
    "/" +
    stateStore.end +
    "/" +
    "rtb_pub_impressions" : "https://dev-app-api.catapultx.com/api/v1/reports/publishers/" +
    stateStore.start +
    "/" +
    stateStore.end +
    "/publisher=" +
    stateStore.selectedPublisher +
    "/rtb_pub_impressions";

  useEffect(() => {
    new StateService(impUrl)
      .Get()
      .then((jres) => jres.total)
      .then((total) => total.rtb_pub_impressions)
      .then((data) => (stateStore.impressions = data))
  });

  return   <Paper style={{ height: "100%" }}><Typography variant="subtitle1">IMPRESSIONS:</Typography><div style={{textAlign: "center"}}><Typography variant="subtitle2">{stateStore.impressions}</Typography></div></Paper>

});
