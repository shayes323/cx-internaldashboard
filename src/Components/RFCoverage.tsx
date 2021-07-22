import { Paper, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect } from "react";
import { StateService } from "../StateService";
import { stateStoreContext } from "../StateStore";

export const RFCoverage = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);


  const rfCoverageUrl: string = stateStore.selectedRemotefeed === "" ?
    "https://dev-app-api.catapultx.com/api/v1/reports/remotefeeds/all/" +
    stateStore.start +
    "/" +
    stateStore.end +
    "/" +
    "rtb_rem_imp_coverage" : "https://dev-app-api.catapultx.com/api/v1/reports/remotefeeds/" +
    stateStore.start +
    "/" +
    stateStore.end +
    "/remotefeed=" +
    stateStore.selectedRemotefeed +
    "/rtb_rem_imp_coverage";

  useEffect(() => {
    new StateService(rfCoverageUrl)
      .Get()
      .then((jres) => jres.total)
      .then((total) => total.rtb_rem_imp_coverage)
      .then((data) => (stateStore.rfCoverage = data))
  });

  return   <Paper style={{ height: "100%" }}><Typography variant="subtitle1">Coverage:</Typography><div style={{textAlign: "center"}}><Typography variant="subtitle2">{stateStore.rfCoverage}</Typography></div></Paper>

});