import { makeAutoObservable, observable, autorun } from "mobx";
import { createContext } from "react";
import { Collection, EnumDeclaration, EnumType } from "typescript";
import { Home } from "./Home";
import { PublisherTableObject } from "./TableObjects";
import { Utils } from "./Utils";

class StateStore {
  public start: string = Utils.GetToday();

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

  public selectedPublisher: string|number = "";

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

  public rfTableArray: any[] = [];

  public page: any = "publishers"

  constructor() {
    makeAutoObservable(this);
  }

}


export const stateStoreContext = createContext(new StateStore());
