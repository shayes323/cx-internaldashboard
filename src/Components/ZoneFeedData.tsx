import { observer } from "mobx-react-lite";
import {
  DataGrid,
  GridColDef,
  GridRowModel,
  GridRowsProp,
} from "@material-ui/data-grid";
import { useContext, useEffect, useState } from "react";
import { StateService } from "../StateService";
import { stateStoreContext } from "../StateStore";
import { TableObject } from "../TableObject";
import { CircularProgress } from "@material-ui/core";
import { InfoRounded } from "@material-ui/icons";
import { toJS } from "mobx";

const columns: GridColDef[] = [
  { field: "zoneFeed", headerName: "Zone/Feed", width: 150 },
  { field: "revenue", headerName: "Revenue", width: 150 },
  { field: "requests", headerName: "Requests", width: 150 },
  { field: "impressions", headerName: "Impressions", width: 150 },
  { field: "fillRate", headerName: "Fill Rate", width: 150 },
  { field: "eCpm", headerName: "Ecpm", width: 150 },
];

export const ZoneFeedData = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);
  const [ready, setReady] = useState<boolean>(false);

  stateStore.tableUrl =
    "https://dev-app-api.catapultx.com/api/v1/reports/zones/all/" +
    stateStore.start +
    "/" +
    stateStore.end +
    "/rtb_pub_impressions,rtb_pub_requests,rtb_pub_revenue,rtb_pub_ecpm";

  console.log(stateStore.tableUrl);
  useEffect(() => {
    console.log("effect used");
    new StateService(stateStore.tableUrl)
      .Get()
      .then((jres: any) => jres.list)
      .then((data: any) =>
        data.map(
          (data: any, key: number) =>
            new TableObject(
              key,
              data.zone,
              data.rtb_pub_revenue,
              data.rtb_pub_requests,
              data.rtb_pub_impressions,
              data.rtb_pub_impressions / (data.rtb_pub_requests / 2),
              data.rtb_pub_ecpm
            )
        )
      ) //array then convert to object
      .then((info: TableObject[]) => (stateStore.tableArray = info))
      .then(() => console.log(columns))
      .then(() => setReady(true));

  }, []);

  if (ready == false) {
    return <div> Loading </div>;
  }
  return (
    <div>
      <DataGrid
        autoHeight
        rows={toJS(stateStore.tableArray) as GridRowModel[]}
        columns={columns}
      />
    </div>
  );
});
