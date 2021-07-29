export class PublisherTableObject {
  public id: number;
  public zoneFeed: string;
  public revenue: number;
  public requests: number;
  public impressions: number;
  public fillRate: number;
  public eCpm: number;

  constructor(
    id?: number,
    zoneFeed?: string,
    revenue?: number,
    requests?: number,
    impressions?: number,
    fillRate?: number,
    eCpm?: number
  ) {
    this.id = id;
    this.zoneFeed = zoneFeed;
    this.revenue = revenue;
    this.requests = requests;
    this.impressions = impressions;
    this.fillRate = fillRate;
    this.eCpm = eCpm;
  }
}

export class RFTableObject {
  public id: number;
  public remoteFeed: string;
  public grossRevenue: number;
  public requestedBids: number;
  public bids: number;
  public avgBidEcpm: number;
  public coverage: number;

  constructor(
    id?: number,
    remoteFeed?: string,
    revenue?: number,
    requests?: number,
    bids?: number,
    avgBidEcpm?: number,
    coverage?: number
  ) {
    this.id = id;
    this.remoteFeed = remoteFeed;
    this.grossRevenue = revenue;
    this.requestedBids = requests;
    this.bids = bids;
    this.avgBidEcpm = avgBidEcpm;
    this.coverage = coverage;
  }
}
