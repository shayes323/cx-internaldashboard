import { Accumulate } from "./AccumulateData";
import { Utils } from "./Utils";

export class ChartData {
  //   public static async GetDates(url: string) {
  //     return Utils.FetchList(url)
  //       .then((data: any) =>
  //         data.map((data: any) => new DateFormatter(data.date).format())
  //       )
  //       .then((dates) => new Set<any>(dates))
  //       .then((dateSet) => Array.from(dateSet));
  //   }

  //   public static async GetRevenue(url: string) {
  //     return Utils.FetchList(url)
  //       .then((data: any) =>
  //         data.map((data: any) => new Map([[data.date, data.rtb_pub_revenue]]))
  //       )
  //       .then((mapped) => Accumulate.AccumulateByDate(mapped));
  //   }

  //   public static async GetRequests(url: string) {
  //     return Utils.FetchList(url)
  //       .then((data: any) =>
  //         data.map((data: any) => new Map([[data.date, data.rtb_pub_requests]]))
  //       )
  //       .then((mapped) => Accumulate.AccumulateByDate(mapped));
  //   }

  //   public static async GetImpressions(url: string) {
  //     return Utils.FetchList(url)
  //       .then((data: any) =>
  //         data.map(
  //           (data: any) => new Map([[data.date, data.rtb_pub_impressions]])
  //         )
  //       )
  //       .then((mapped) => Accumulate.AccumulateByDate(mapped));
  //   }

  //   public static async GetGrossRev(url: string) {
  //     return Utils.FetchList(url)
  //       .then((data: any) =>
  //         data.map((data: any) => new Map([[data.date, data.rtb_rem_gross]]))
  //       )
  //       .then((mapped) => Accumulate.AccumulateByDate(mapped));
  //   }

  //   public static async GetReqBids(url: string) {
  //     return Utils.FetchList(url)
  //       .then((data: any) =>
  //         data.map(
  //           (data: any) => new Map([[data.date, data.rtb_rem_imp_requests]])
  //         )
  //       )
  //       .then((mapped) => Accumulate.AccumulateByDate(mapped));
  //   }
  //   public static async GetRespBids(url: string) {
  //     return Utils.FetchList(url)
  //       .then((data: any) =>
  //         data.map(
  //           (data: any) => new Map([[data.date, data.rtb_rem_imp_coverage]])
  //         )
  //       )
  //       .then((mapped) => Accumulate.AccumulateByDate(mapped));
  //   }

  public static async GetDeviceCounts(url: string): Promise<any> {
    var ovrCount: number = 0;
    var unkCount: number = 0;
    var otherCount: number = 0;
    var mobCount: number = 0;
    var tabCount: number = 0;
    var tvCount: number = 0;
    var deskCount: number = 0;
    var gcCount: number = 0;
    return Utils.FetchList(url)
      .then((data: any) =>
        data.forEach((obj) => {
          ovrCount++;
          if (obj.device_type === "UNKNOWN") {
            unkCount++;
          } else if (obj.device_type === "OTHER") {
            otherCount++;
          } else if (obj.device_type === "MOBILE") {
            mobCount++;
          } else if (obj.device_type === "DESKTOP") {
            deskCount++;
          } else if (obj.device_type === "TABLET") {
            tabCount++;
          } else if (obj.device_type === "TV") {
            tvCount++;
          } else if (obj.device_type === "GAME_CONSOLE") {
            gcCount++;
          }
        })
      )
      .then(() => [
        unkCount,
        otherCount,
        mobCount,
        deskCount,
        tabCount,
        tvCount,
        gcCount,
        ovrCount,
      ]);
  }

  public static async GetTrafficCounts(url: string): Promise<any> {
    var bannerCount: number = 0;
    var videoCount: number = 0;
    var nativeCount: number = 0;
    var ovrCount: number = 0;
    return Utils.FetchList(url)
      .then((data: any) =>
        data.forEach((obj) => {
          ovrCount++;
          if (obj.imp_type === "BANNER") {
            bannerCount++;
          } else if (obj.imp_type === "VIDEO") {
            videoCount++;
          } else if (obj.imp_type === "NATIVE") {
            nativeCount++;
          }
        })
      )
      .then(() => [bannerCount, videoCount, nativeCount, ovrCount]);
  }
}
