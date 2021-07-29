import { Accumulate } from "./AccumulateData";
import { DateFormatter } from "./DateFormatter";
import { Utils } from "./Utils";

export class ChartData {
  public static GetDates(url: string) {
    return Utils.FetchList(url)
      .then((data: any) =>
        data.map((data: any) => new DateFormatter(data.date).format())
      )
      .then((dates) => new Set<any>(dates))
      .then((dateSet) => Array.from(dateSet));
  }

  public static GetRevenue(url: string) {
    return Utils.FetchList(url)
      .then((data: any) =>
        data.map((data: any) => new Map([[data.date, data.rtb_pub_revenue]]))
      )
      .then((mapped) => Accumulate.AccumulateByDate(mapped));
  }

  public static GetRequests(url: string) {
    return Utils.FetchList(url)
      .then((data: any) =>
        data.map((data: any) => new Map([[data.date, data.rtb_pub_requests]]))
      )
      .then((mapped) => Accumulate.AccumulateByDate(mapped));
  }

  public static GetImpressions(url: string) {
    return Utils.FetchList(url)
      .then((data: any) =>
        data.map(
          (data: any) => new Map([[data.date, data.rtb_pub_impressions]])
        )
      )
      .then((mapped) => Accumulate.AccumulateByDate(mapped));
  }

  public static GetGrossRev(url: string) {
    return Utils.FetchList(url)
      .then((data: any) =>
        data.map((data: any) => new Map([[data.date, data.rtb_rem_gross]]))
      )
      .then((mapped) => Accumulate.AccumulateByDate(mapped));
  }

  public static GetReqBids(url: string) {
    return Utils.FetchList(url)
      .then((data: any) =>
        data.map(
          (data: any) => new Map([[data.date, data.rtb_rem_imp_requests]])
        )
      )
      .then((mapped) => Accumulate.AccumulateByDate(mapped));
  }
  public static GetRespBids(url: string) {
    return Utils.FetchList(url)
    .then((data: any) =>
      data.map(
        (data: any) => new Map([[data.date, data.rtb_rem_imp_coverage]])
      )
    )
    .then((mapped) => Accumulate.AccumulateByDate(mapped))

  }
}
