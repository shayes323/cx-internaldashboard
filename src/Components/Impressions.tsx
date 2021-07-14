import { Paper } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect } from "react";
import { StateService } from "../StateService";
import { stateStoreContext } from "../StateStore";

export const Impressions = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);

  const impUrl: string =
    "https://dev-app-api.catapultx.com/api/v1/reports/publishers/all/" +
    stateStore.start +
    "/" +
    stateStore.end +
    "/" +
    "rtb_pub_impressions";

  useEffect(() => {
    new StateService(impUrl)
      .Get()
      .then((jres) => jres.total)
      .then((total) => total.rtb_pub_impressions)
      .then((data) => (stateStore.impressions = data))
  });

  return <Paper style={{height: "100%"}}>Impressions: {stateStore.impressions}</Paper>;
});
