import { Utils } from "./Utils";

export class ChartData {

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
        data.forEach((obj: any) => {
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
    var bannerBids: number = 0;
    var bannerEcpm: number = 0;
    var videoCount: number = 0;
    var videoBids: number = 0;
    var videoEcpm: number = 0;
    var bannerBids: number = 0;
    var bannerEcpm: number = 0;
    var nativeCount: number = 0;
    var nativeBids: number = 0;
    var nativeEcpm: number = 0;
    var ovrCount: number = 0;
    var ovrEcpm: number = 0;

    return Utils.FetchList(url)
      .then((data: any) =>
        data.forEach((obj: any) => {
          ovrCount += obj.rtb_rem_gross;
          ovrEcpm += obj.rtb_pub_gross_ecpm;
          if (obj.imp_type === "BANNER") {
            bannerCount += obj.rtb_rem_gross;
            bannerBids += obj.rtb_rem_imp_coverage;
            bannerEcpm += obj.rtb_pub_gross_ecpm
          } else if (obj.imp_type === "VIDEO") {
            videoCount += obj.rtb_rem_gross;
            videoBids += obj.rtb_rem_imp_coverage;
            videoEcpm += obj.rtb_pub_gross_ecpm
          } else if (obj.imp_type === "NATIVE") {
            nativeCount += obj.rtb_rem_gross;
            nativeBids += obj.rtb_rem_coverage;
            nativeEcpm += obj.rtb_pub_gross_ecpm

          }
        })
      )
      .then(() => [bannerCount, videoCount, nativeCount, ovrCount, bannerBids, videoBids, nativeBids, bannerEcpm, videoEcpm, nativeEcpm, ovrEcpm]);
  }
}
