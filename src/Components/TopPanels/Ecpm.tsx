import { Paper, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect } from "react";
import { StateService } from "../../StateService";
import { stateStoreContext } from "../../StateStore";
import { Utils } from "../../Utils";

export const Ecpm = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);


  const ecpmUrl: string = stateStore.selectedPublisher === "" ?
    "https://dev-app-api.catapultx.com/api/v1/reports/publishers/all/" +
    stateStore.start +
    "/" +
    stateStore.end +
    "/" +
    "rtb_pub_ecpm" : "https://dev-app-api.catapultx.com/api/v1/reports/publishers/" +
    stateStore.start +
    "/" +
    stateStore.end +
    "/publisher=" +
    stateStore.selectedPublisher +
    "/rtb_pub_ecpm";

  useEffect(() => {
    new StateService(ecpmUrl)
      .Get()
      .then((jres) => jres.total)
      // .then((test) => console.log(test));
      .then((total) => total.rtb_pub_ecpm)
      .then((data) => (stateStore.ecpm = data))
  });

  return   <Paper style={{ height: "100%" }}><Typography variant="subtitle1">ECPM:</Typography><div style={{textAlign: "center"}}><Typography variant="subtitle2">{Utils.RoundNum(stateStore.ecpm)}</Typography></div></Paper>

});
