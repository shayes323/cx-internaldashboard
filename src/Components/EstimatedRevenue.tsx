import { Paper } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect } from "react";
import { StateService } from "../StateService";
import { stateStoreContext } from "../StateStore";

export const EstimatedRevenue = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);

  const estRevUrl: string =
    "https://dev-app-api.catapultx.com/api/v1/reports/publishers/all/" +
    stateStore.start +
    "/" +
    stateStore.end +
    "/" +
    "rtb_pub_revenue";

  useEffect(() => {
    new StateService(estRevUrl)
      .Get()
      .then((jres) => jres.total)
      .then((total) => total.rtb_pub_revenue)
      .then((data) => (stateStore.estimatedRevenue = data))
  });

  return <Paper style={{height: "100%"}}>Estimated Revenue: {stateStore.estimatedRevenue}</Paper>;
});
