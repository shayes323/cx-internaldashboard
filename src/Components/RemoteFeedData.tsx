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
import { PublisherTableObject, RFTableObject } from "../TableObjects";
import {
  Box,
  CircularProgress,
  Paper,
  responsiveFontSizes,
} from "@material-ui/core";
import { Height, InfoRounded } from "@material-ui/icons";
import { toJS } from "mobx";
import dt from "datatables.net";
import MaterialTable, { Column } from "material-table";
import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { Utils } from "../Utils";

const columns: any[] = [
  { field: "zoneFeed", headerName: "Zone/Feed", width: 170 },
  { field: "revenue", headerName: "Revenue", width: 140 },
  { field: "requests", headerName: "Requests", width: 140 },
  { field: "impressions", headerName: "Impressions", width: 155 },
  { field: "fillRate", headerName: "Fill Rate", width: 130 },
  { field: "eCpm", headerName: "Ecpm", width: 120 },
];

export const RemoteFeedData = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);
  const [ready, setReady] = useState<boolean>(false);

  const tableUrl: string =
    stateStore.selectedRemotefeed !== ""
      ? Utils.CreateUrl(
          "remotefeeds",
          stateStore.start,
          stateStore.end,
          "remotefeed=" + stateStore.selectedRemotefeed,
          "dsp_seat",
          "rtb_rem_gross,rtb_rem_imp_requests,rtb_rem_imp_coverage,rtb_rem_top_bids_price_avg,rtb_rem_imp_coverage,rtb_rem_coverage_rate"
        )
      : Utils.CreateUrl(
          "remotefeeds",
          stateStore.start,
          stateStore.end,
          "none",
          "none",
          "rtb_rem_gross,rtb_rem_imp_requests,rtb_rem_imp_coverage,rtb_rem_top_bids_price_avg,rtb_rem_imp_coverage,rtb_rem_coverage_rate"
        );

  console.log(tableUrl);
  useEffect(() => {
    console.log("EFFECT RAN");
    Utils.FetchList(tableUrl)
      .then((data: any) =>
        data.map(
          (data: any, key: number) =>
            new RFTableObject(
              key,
              stateStore.selectedRemotefeed !== ""
                ? data.dsp_seat
                : data.remotefeed,
              data.rtb_rem_gross,
              data.rtb_rem_imp_requests,
              data.rtb_rem_imp_coverage,
              data.rtb_rem_top_bids_price_avg,
              data.rtb_rem_coverage_rate
            )
        )
      )
      // .then((test) => console.log(test));
    .then((info: RFTableObject[]) => (stateStore.rfTableArray = info))
    .then(() => console.log(stateStore.selectedRemotefeed))
    .then(() => console.log(stateStore.rfTableArray))
    .then(() => setReady(true))
  }, [stateStore.start, stateStore.end, stateStore.selectedRemotefeed]);

  // } else {
  //   new RFTableObject(
  //     key,
  //     data.dsp_seat,
  //     data.rtb_rem_gross,
  //     data.rtb_rem_imp_requests,
  //     data.rtb_rem_imp_coverage,
  //     data.rtb_rem_top_bids_price_avg,
  //     data.rtb_rem_imp_coverage
  //   );
  // }

  if (ready == false) {
    return <div> <CircularProgress/> </div>;
  } else if (stateStore.selectedRemotefeed === "") {
    return (
      <div>
        <Box m={2} style={{ marginTop: "-3px" }}>
          <Paper>
            <MaterialTable
              icons={tableIcons}
              title="Remote Feed Data"
              options={{
                search: true,
                paging: false,
                maxBodyHeight: 300,
                minBodyHeight: 300,
              }}
              columns={[
                { field: "remoteFeed", title: "Remote Feed", width: 170 },
                { field: "grossRevenue", title: "Gross Revenue", width: 140 },
                { field: "requestedBids", title: "Requested Bids", width: 140 },
                { field: "bids", title: "Bids", width: 155 },
                { field: "avgBidEcpm", title: "Average Bid ECPM", width: 130 },
                { field: "coverage", title: "Coverage", width: 120 },
              ]}
              data={toJS(stateStore.rfTableArray)}
            />
          </Paper>
        </Box>
      </div>
    );
  } else {
    return (
      <div>
        <Box m={2} style={{ marginTop: "-3px" }}>
          <Paper>
            <MaterialTable
              icons={tableIcons}
              title="Remote Feed Data"
              options={{
                search: true,
                paging: false,
                maxBodyHeight: 300,
                minBodyHeight: 300,
              }}
              columns={[
                { field: "dspSeat", title: "DSP Seat", width: 170 },
                { field: "grossRevenue", title: "Gross Revenue", width: 140 },
                { field: "requestedBids", title: "Requested Bids", width: 140 },
                { field: "bids", title: "Bids", width: 155 },
                { field: "avgBidEcpm", title: "Average Bid ECPM", width: 130 },
                { field: "coverage", title: "Coverage", width: 120 },
              ]}
              data={toJS(stateStore.rfTableArray)}
            />
          </Paper>
        </Box>
      </div>
    );
  }
});

const tableIcons: any = {
  Add: forwardRef((props: any, ref: any) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props: any, ref: any) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props: any, ref: any) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props: any, ref: any) => (
    <DeleteOutline {...props} ref={ref} />
  )),
  DetailPanel: forwardRef((props: any, ref: any) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props: any, ref: any) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props: any, ref: any) => (
    <SaveAlt {...props} ref={ref} />
  )),
  Filter: forwardRef((props: any, ref: any) => (
    <FilterList {...props} ref={ref} />
  )),
  FirstPage: forwardRef((props: any, ref: any) => (
    <FirstPage {...props} ref={ref} />
  )),
  LastPage: forwardRef((props: any, ref: any) => (
    <LastPage {...props} ref={ref} />
  )),
  NextPage: forwardRef((props: any, ref: any) => (
    <ChevronRight {...props} ref={ref} />
  )),
  PreviousPage: forwardRef((props: any, ref: any) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props: any, ref: any) => (
    <Clear {...props} ref={ref} />
  )),
  Search: forwardRef((props: any, ref: any) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props: any, ref: any) => (
    <ArrowDownward {...props} ref={ref} />
  )),
  ThirdStateCheck: forwardRef((props: any, ref: any) => (
    <Remove {...props} ref={ref} />
  )),
  ViewColumn: forwardRef((props: any, ref: any) => (
    <ViewColumn {...props} ref={ref} />
  )),
};
