import { Paper, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect } from "react";
import { StateService } from "../StateService";
import { stateStoreContext } from "../StateStore";
import { Num } from "./Num";

export const FillRate = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);

  var today: any = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;

  const fillRateUrl: string = stateStore.selectedPublisher === "" ?
    "https://dev-app-api.catapultx.com/api/v1/reports/publishers/all/" +
    stateStore.start +
    "/" +
    stateStore.end +
    "/" +
    "rtb_pub_impressions,rtb_pub_requests" : "https://dev-app-api.catapultx.com/api/v1/reports/publishers/" +
    stateStore.start +
    "/" +
    stateStore.end +
    "/publisher=" +
    stateStore.selectedPublisher +
    "/rtb_pub_impressions,rtb_pub_requests";

  useEffect(() => {
    new StateService(fillRateUrl)
      .Get()
      .then((jres) => jres.total)
      .then((obj) => Object.keys(obj).map(
        (key) => obj[key]))
      .then((arr) => (stateStore.fillRateData = arr))
      .then(() => stateStore.fillRate = (stateStore.fillRateData[0] / (stateStore.fillRateData[1] / 2)))
  });


  return   <Paper style={{ height: "100%" }}><Typography variant="subtitle1">FILL RATE:</Typography><div style={{textAlign: "center"}}><Typography variant="subtitle2">{Num.RoundNum(stateStore.fillRate)}</Typography></div></Paper>

});
