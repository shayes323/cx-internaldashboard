export class PublisherTableObject {
  public id: number;
  public zoneFeed: string;
  public revenue: number | string;
  public requests: number;
  public impressions: number;
  public fillRate: number | string;
  public eCpm: number | string;

  constructor(
    id: number,
    zoneFeed: string,
    revenue: number | string,
    requests: number,
    impressions: number,
    fillRate: number | string,
    eCpm: number | string
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
  public grossRevenue: string | number;
  public requestedBids: number;
  public bids: number | string;
  public avgBidEcpm: string | number;
  public coverage: string | number;

  constructor(
    id?: number,
    remoteFeed?: string,
    grossRevenue?: string | number,
    requestedBids?: number,
    bids?: number | string,
    avgBidEcpm?: string | number,
    coverage?: string | number
  ) {
    this.id = id;
    this.remoteFeed = remoteFeed;
    this.grossRevenue = grossRevenue;
    this.requestedBids = requestedBids;
    this.bids = bids;
    this.avgBidEcpm = avgBidEcpm;
    this.coverage = coverage;
  }
}

export class RFTableObjectSelect {
  public id?: number;
  public dspSeat?: number | string;
  public grossRev?: number | string;
  public grossEcpm?: number | string;
  public netImpressions?: number | string;
  public grossCtr?: number | string;

  constructor(
    id: number,
    dspSeat: number | string,
    grossRev: number | string,
    grossEcpm: number | string,
    netImpressions: number | string,
    grossCtr: number | string
  ) {
    this.id = id;
    this.dspSeat= dspSeat;
    this.grossRev = grossRev;
    this.grossEcpm = grossEcpm;
    this.netImpressions = netImpressions;
    this.grossCtr = grossCtr;
  }
}
