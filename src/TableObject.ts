import { observable } from "mobx";



export class TableObject {
    public id: number;
    public zoneFeed: string;
    public revenue: number;
    public requests: number;
    public impressions: number;
    public fillRate: number;
    public eCpm: number;

    constructor(id?: number, zoneFeed?: string, revenue?: number, requests?: number, impressions?: number, fillRate?: number, eCpm?: number) {
        this.id = id;
        this.zoneFeed = zoneFeed;
        this.revenue = revenue;
        this.requests = requests;
        this.impressions = impressions;
        this.fillRate = fillRate;
        this.eCpm = eCpm;
    }

    add(id: number, zoneFeed: string, revenue: number, requests: number, impressions: number, fillRate: number, eCpm: number) {
        this.id = id;
        this.zoneFeed = zoneFeed;
        this.revenue = revenue;
        this.requests = requests;
        this.impressions = impressions;
        this.fillRate = fillRate;
        this.eCpm = eCpm;
    }

}