import { makeAutoObservable, observable, autorun } from "mobx";
import { createContext } from "react";
import { Collection, EnumDeclaration } from "typescript";
import { Day } from "./Day";
import { Home } from "./Home";
import { TableObject } from "./TableObject";

class StateStore {
  public start: string = Day.getToday();

  public end: string = Day.getToday();
  
  public clickedButton: boolean = false;

  public reportType = "";

  public responseData: any[] = [];

  public responseDates: any[] = [];

  public responseRevenue: any[] = [];

  public responseImpressions: any[] = [];
  public responseRequests: any[] = [];

  public responseFillRate: any[] = [];

  public responseEcpm: any[] = [];

  public publishersList: any[] = [];

  public fillRateData: any[] = [];

  public fillRate: any = "";

  public estimatedRevenue: any[] = [];

  public requests: any = "";

  public impressions: any = "";

  public ecpm: any = "";

  public selectedPublisher: any;

  public tableArray: TableObject[];

  public tableUrl: string;

  public tableObject: TableObject;


  public Page = Page.PublisherPage;

  constructor() {
    makeAutoObservable(this, { tableArray: observable.ref });
  }

}

export enum Page {
  PublisherPage,
  RemoteFeedPage,
}

export const stateStoreContext = createContext(new StateStore());
