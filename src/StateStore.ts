import { makeAutoObservable, observable, autorun } from "mobx";
import { createContext } from "react";
import { Collection, EnumDeclaration, EnumType } from "typescript";
import { App } from "./App";
import { PublisherTableObject, RFTableObject } from "./TableObjects";
import { Utils } from "./Utils";

class StateStore {
  readonly startKey: string = "startKey";
  readonly endKey: string = "endKey";
  readonly selectedRFKey: string = "selectedRFKey";
  readonly selectedRFNameKey: string = "selectedRFNameKey";
  readonly selectedPubKey: string = "selectedPubKey";
  readonly selectedPubNameKey: string = "selectedPubNameKey";
  readonly currentPageKey: string = "currentPageKey";

  public start: string =
    this.getFromLocalStorage(this.startKey) || Utils.GetFirstOfMonth();
  public end: string =
    this.getFromLocalStorage(this.endKey) || Utils.GetToday();

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

  public confirmedRevenue: any = "";

  public selectedPublisher: any =
    this.getFromLocalStorage(this.selectedPubKey) || "";
  public selectedPublisherName: string =
    this.getFromLocalStorage(this.selectedPubNameKey) || "all";

  public publisherTableArray: PublisherTableObject[];

  public publisherTableObject: PublisherTableObject;

  public winRate: any = "";

  public ctr: any = "";

  public rfGrossRevenue: any = "";

  public rfConfirmedGrossRevenue: any = "";

  public rfRequestedBids: any = "";

  public rfBids: any = "";

  public rfAvgBidEcpm: any = "";

  public rfCoverage: any = "";

  public remotefeedsMap: Map<string, number> = new Map();
  public remotefeedsList: any[] = [];
  public selectedRemotefeed: any =
    this.getFromLocalStorage(this.selectedRFKey) || "";
  public selectedRemoteFeedName: string =
    this.getFromLocalStorage(this.selectedRFNameKey) || "all";

  public rfResponseDates: any[] = [];
  public rfResponseGrossRev: any = "";
  public rfResponseRequestedBids: any = "";
  public rfResponseBids: any = "";

  public rfTableArray: RFTableObject[] = [];

  public page: any =
    this.getFromLocalStorage(this.currentPageKey) || "publishers";

  public deviceCounts: number[];

  public pieChartReload: boolean = false;

  public pubPieChartData: number[] = [];
  public rfPieChartData: number[] = [];

  public pageLoading: boolean[] = [true, true, true];

  public pubStatsFetching: boolean[] = [
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ];

  public rfStatsFetching: boolean[] = [true, true, true, true, true, true];
  public pubChartReady: boolean = false;

  public pieChartReady: boolean = false;

  public dailyChartReload: boolean = false;

  public setToLocalStorage(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public getFromLocalStorage(key: string): any {
    console.log(this.start);
    console.log(this.end);
    const data = localStorage.getItem(key);
    if (!data) {
      return null;
    }
    return JSON.parse(data);
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const stateStoreContext = createContext(new StateStore());
