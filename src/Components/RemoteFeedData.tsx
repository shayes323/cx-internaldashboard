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
import {
  PublisherTableObject,
  RFTableObject,
  RFTableObjectSelect,
} from "../TableObjects";
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
import LoadingOverlay from 'react-loading-overlay';

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
          "dsp_seat,rtb_rem_gross,rtb_rem_gross_ecpm,rtb_pub_impressions,rtb_pub_ctr"
        )
      : Utils.CreateUrl(
          "remotefeeds",
          stateStore.start,
          stateStore.end,
          "none",
          "none",
          "rtb_rem_gross,rtb_rem_imp_requests,rtb_rem_imp_coverage,rtb_rem_top_bids_price_avg,rtb_rem_imp_coverage,rtb_rem_coverage_rate"
        );

  function TableHelper(
    data: any,
    key: number
  ): RFTableObject | RFTableObjectSelect {
    if (stateStore.selectedRemotefeed === "") {
      return new RFTableObject(
        key,
        data.remotefeed,
        Utils.ToDollar(data.rtb_rem_gross),
        Utils.ToFullNum(data.rtb_rem_imp_requests),
        Utils.ToFullNum(data.rtb_rem_imp_coverage),
        Utils.ToDollar(data.rtb_rem_top_bids_price_avg),
        Utils.ToPercentage(data.rtb_rem_coverage_rate)
      );
    } else {
      return new RFTableObjectSelect(
        key,
        data.dsp_seat,
        Utils.ToDollar(data.rtb_rem_gross),
        Utils.ToDollar(data.rtb_rem_gross_ecpm),
        Utils.ToFullNum(data.rtb_pub_impressions),
        Utils.RoundNum(data.rtb_pub_ctr)
      );
    }
  }

  console.log(tableUrl);
  useEffect(() => {
    Utils.FetchList(tableUrl)
      .then((data: any) =>
        data.map((data: any, key: number) => TableHelper(data, key))
      )
      .then((info: RFTableObject[]) => (stateStore.rfTableArray = info))
      .then(() => console.log(stateStore.selectedRemotefeed))
      .then(() => setReady(true));
  }, [stateStore.start, stateStore.end, stateStore.selectedRemotefeed]);

  if (stateStore.selectedRemotefeed === "") {
    stateStore.pageLoading[1] = false;
    return (
      <div>
        <Box m={2} style={{ marginTop: "-3px" }}>
        <LoadingOverlay
          active={ready === false}
          text={<div className="highcharts-loading-text">Loading...</div>}
          styles={{
            overlay: (base: any) => ({
              ...base,
              background: "rgba(255, 255, 255, 0.5)",
              
            }),
            
          }}
        >
          <Paper>
            <MaterialTable
              style={{ whiteSpace: "nowrap" }}
              icons={tableIcons}
              title="Remote Feed Data"
              options={{
                search: true,
                paging: false,
                maxBodyHeight: 300,
                minBodyHeight: 300,
              }}
              columns={[
                {
                  field: "remoteFeed",
                  title: "Remote Feed",
                  width: 70,
                  align: "left",
                },
                {
                  field: "grossRevenue",
                  title: "Estimated Gross Revenue",
                  width: 70,
                  align: "left",
                  defaultSort: "desc"
                },
                {
                  field: "requestedBids",
                  title: "Requested Bids",
                  width: 70,
                  align: "left",
                },
                { field: "bids", title: "Bids", width: 70, align: "left" },
                {
                  field: "avgBidEcpm",
                  title: "Average Bid ECPM",
                  width: 70,
                  align: "left",
                },
                {
                  field: "coverage",
                  title: "Coverage",
                  width: 70,
                  align: "left",
                },
              ]}
              data={toJS(stateStore.rfTableArray)}
            />
          </Paper>
          </LoadingOverlay>
        </Box>
      </div>
    );
  } else {
    stateStore.pageLoading[1] = false;
    return (
      <div>
        <Box m={2} style={{ marginTop: "-3px" }}>
        <LoadingOverlay
          active={ready === false}
          text={<div className="highcharts-loading-text">Loading...</div>}
          styles={{
            overlay: (base: any) => ({
              ...base,
              background: "rgba(255, 255, 255, 0.5)",
              
            }),
            
          }}
        >
          <Paper>
            <MaterialTable
              style={{ whiteSpace: "nowrap" }}
              icons={tableIcons}
              title="Remote Feed Data"
              options={{
                sorting: true,
                search: true,
                paging: false,
                maxBodyHeight: 300,
                minBodyHeight: 300,
              }}
              columns={[
                {
                  field: "dspSeat",
                  title: "DSP Seat",
                  align: "left",
                  cellStyle: {
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    maxWidth: 20,
                  },
                },
                {
                  field: "grossRev",
                  title: "Gross Revenue",
                  width: 70,
                  align: "left",
                  defaultSort: "desc"
                },
                {
                  field: "grossEcpm",
                  title: "Gross ECPM",
                  width: 70,
                  align: "left",
                },
                {
                  field: "netImpressions",
                  title: "Impressions",
                  width: 70,
                  align: "left",
                },
                { field: "grossCtr", title: "CTR", width: 70, align: "left" },
              ]}
              data={toJS(stateStore.rfTableArray)}
            />
          </Paper>
          </LoadingOverlay>
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
