export class RFTableObject {
    public id: number;
    public remoteFeed: string;
    public grossRevenue: number;
    public requestedBids: number;
    public bids: number;
    public avgBidEcpm: number;
    public coverage: number;

    constructor(id?: number, remoteFeed?: string, revenue?: number, requests?: number, bids?: number, avgBidEcpm?: number, coverage?: number) {
        this.id = id;
        this.remoteFeed = remoteFeed;
        this.grossRevenue = revenue;
        this.requestedBids = requests;
        this.bids = bids;
        this.avgBidEcpm = avgBidEcpm;
        this.coverage = coverage;
    }
}