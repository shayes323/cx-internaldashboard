import { Accumulate } from "./AccumulateData";
import { StateService } from "./StateService";

export class Utils {
  public static FetchList(url: string) {
    return new StateService(url).Get().then((jres: any) => jres.list);
  }

  public static RoundNum(num: any) {
    return (Math.round(num * 100) / 100).toFixed(4);
  }

  public static GetToday() {
    var today: any = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    return today = yyyy + "-" + mm + "-" + dd;
  }
  
  
}
