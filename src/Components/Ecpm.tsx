import { Paper } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import react, { useContext, useEffect } from "react";
import { StateService } from "../StateService";
import { stateStoreContext } from "../StateStore";

export const Ecpm = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);

  var today: any = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;

  const ecpmUrl: string =
    "https://dev-app-api.catapultx.com/api/v1/reports/publishers/all/" +
    stateStore.start +
    "/" +
    stateStore.end +
    "/" +
    "rtb_pub_ecpm";

  useEffect(() => {
    new StateService(ecpmUrl)
      .Get()
      .then((jres) => jres.total)
      .then((total) => total.rtb_pub_ecpm)
      .then((data) => (stateStore.ecpm = data))
  });

  return <Paper style={{height: "100%"}}>ECPM: {stateStore.ecpm}</Paper>;
});
