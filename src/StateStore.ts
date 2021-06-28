import { makeAutoObservable, observable, autorun } from "mobx";
import { createContext } from "react";
import { Home } from './Home';


class StateStore {
    
    public start: string = "";
    public end: string = "";
    public clickedButton: boolean = false;

    public reportType = "";

    public responseData: any[] = [];

    public zonesList: any[] =[];

    public selectedZone: any;

    constructor() {
       makeAutoObservable(this);
    }

    set SetResponse(data: any[]) {
        this.responseData = data;
    }
    set SetZnes(data: any[]) {
        this.zonesList = data;
    }

}

export const stateStoreContext = createContext(new StateStore());