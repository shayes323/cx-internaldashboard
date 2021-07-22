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
import { PublisherTableObject } from "../PublisherTableObject";
import { Box, CircularProgress, Paper, responsiveFontSizes } from "@material-ui/core";
import { Height, InfoRounded } from "@material-ui/icons";
import { toJS } from "mobx";
import dt from 'datatables.net'
import MaterialTable, { Column } from "material-table";
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons: any = {
    Add: forwardRef((props: any, ref: any) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props: any, ref: any) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props: any, ref: any) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props: any, ref: any) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props: any, ref: any) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props: any, ref: any) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props: any, ref: any) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props: any, ref: any) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props: any, ref: any) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props: any, ref: any) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props: any, ref: any) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props: any, ref: any) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props: any, ref: any) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props: any, ref: any) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props: any, ref: any) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props: any, ref: any) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props: any, ref: any) => <ViewColumn {...props} ref={ref} />)
  };



const columns: any[] = [
  { field: "zoneFeed", headerName: "Zone/Feed", width: 170},
  { field: "revenue", headerName: "Revenue", width: 140 },
  { field: "requests", headerName: "Requests", width: 140 },
  { field: "impressions", headerName: "Impressions", width: 155},
  { field: "fillRate", headerName: "Fill Rate", width: 130 },
  { field: "eCpm", headerName: "Ecpm", width: 120 },
];

export const ZoneFeedData = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);
  const [ready, setReady] = useState<boolean>(false);

  const tableUrl =
    stateStore.selectedPublisher === ""
      ? "https://dev-app-api.catapultx.com/api/v1/reports/zones/all/" +
        stateStore.start +
        "/" +
        stateStore.end +
        "/rtb_pub_impressions,rtb_pub_requests,rtb_pub_revenue,rtb_pub_ecpm"
      : "https://dev-app-api.catapultx.com/api/v1/reports/zones/" +
        stateStore.start +
        "/" +
        stateStore.end +
        "/" +
        "publisher=" +
        stateStore.selectedPublisher +
        "/rtb_pub_impressions,rtb_pub_requests,rtb_pub_revenue,rtb_pub_ecpm";

  useEffect(() => {
    console.log("effect used");
    new StateService(tableUrl)
      .Get()
      .then((jres: any) => jres.list)
      .then((data: any) =>
        data.map(
          (data: any, key: number) =>
            new PublisherTableObject(
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
      .then((info: PublisherTableObject[]) => (stateStore.publisherTableArray = info))
      .then(() => console.log(columns))
      .then(() => setReady(true));
  });

  if (ready == false) {
    return <div> Loading </div>;
  }

  return (
    <div>
      <Box m={2} style={{ marginTop: "-3px" }} >
      <Paper>
        <MaterialTable
          icons={tableIcons}
          title="Zone/Feed Data"
          options={{
            search: true,
            paging: false,
            maxBodyHeight: 300
          }}
          columns={[
            { field: "zoneFeed", title: "Zone/Feed", width: 170},
            { field: "revenue", title: "Revenue", width: 140 },
            { field: "requests", title: "Requests", width: 140 },
            { field: "impressions", title: "Impressions", width: 155},
            { field: "fillRate", title: "Fill Rate", width: 130 },
            { field: "eCpm", title: "Ecpm", width: 120 },
          ]}
          data={toJS(stateStore.publisherTableArray)}

        />
      </Paper>
      </Box>
    </div>
  );
});



