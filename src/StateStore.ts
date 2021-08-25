import { makeAutoObservable, observable, autorun } from "mobx";
import { createContext } from "react";
import { Collection, EnumDeclaration, EnumType } from "typescript";
import App from "./App";
import { PublisherTableObject, RFTableObject } from "./TableObjects";
import { Utils } from "./Utils";

class StateStore {
  public start: string = Utils.GetFirstOfMonth();

  public end: string = Utils.GetToday();

  public clickedButton: boolean = false;

  public reportType: any ="";

  public responseData: any[] = [];

  public responseDates: any[] = [];

  public responseRevenue: any[] = [];

  public responseImpressions: any[] = [];
  public responseRequests: any[] = [];

  public responseFillRate: any[] = [];

  public responseEcpm: any[] = [];

  public publishersList: any[] = [];

  public publishersMap: Map<string, number> = new Map();

  public fillRateData: any[] = [];

  public fillRate: any = "";

  public estimatedRevenue: any;

  public requests: any = "";

  public impressions: any = "";

  public ecpm: any = "";

  public selectedPublisher: any = "";

  public publisherTableArray: PublisherTableObject[];

  public tableUrl: string;

  public publisherTableObject: PublisherTableObject;

  public winRate: any = "";

  public ctr: any = "";

  public rfGrossRevenue: any = "";

  public rfRequestedBids: any = "";

  public rfBids: any = "";

  public rfAvgBidEcpm: any = "";

  public rfCoverage: any = "";

  public remotefeedsMap: Map<string, number> = new Map();
  public remotefeedsList: any[] = [];
  public selectedRemotefeed: any = "";

  public chartX: any = "";
  public chartPrimaryY: any = "";
  public chartSecondaryY: any = "";

  //RFDailyChart
  public rfResponseDates: any[] = [];
  public rfResponseGrossRev: any = "";
  public rfResponseRequestedBids: any = "";
  public rfResponseBids: any = "";

  public rfTableArray: RFTableObject[] = [];

  public page: any = "publishers"

  public deviceCounts: number[];

  public pieChartReload: boolean = false;

  public pubPieChartData: number[] = [];
  public rfPieChartData: number[] = [];



  public pageLoading: boolean[] = [true, true, true];


  public pubStatsFetching: boolean[] = [true, true, true, true, true, true, true];

  public rfStatsFetching: boolean[] = [true, true, true, true, true];

  public ctrFetching: boolean = true;

  public pubChartReady: boolean = false;

  public pieChartReady: boolean = false;


  public dailyChartReload: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

}


export const stateStoreContext = createContext(new StateStore());
