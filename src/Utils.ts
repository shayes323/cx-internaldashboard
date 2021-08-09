import { TheatersRounded, ViewArrayOutlined } from "@material-ui/icons";
import { isVariableDeclaration } from "typescript";
import { Accumulate } from "./AccumulateData";
import { StateService } from "./StateService";

export class Utils {
  public static async FetchList(url: string) : Promise<any> {
    return new StateService(url).Get().then((jres: any) => jres.list);
  }

  public static async FetchTotal(url: string) : Promise<any>{
    return new StateService(url).Get().then((jres: any) => jres.total);
  }

  public static RoundNum(num: number) {
    return (Math.round(num * 100) / 100).toFixed(2);;
  }

  public static ToDollar(num: number) : string|number {
    return "$" + (Math.round(num * 100) / 100).toFixed(2);
  }

  public static ToPercentage(num: number) : string|number {
    return (Math.round(num * 100) / 100).toFixed(2) + "%";
  }

  public static GetToday() {
    var today: any = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    return today = yyyy + "-" + mm + "-" + dd;
  }

  public static GetFirstOfMonth() : string {
    var first: any = new Date();
    var mm = String(first.getMonth() + 1).padStart(2, "0");
    var yyyy = first.getFullYear();
    return first = yyyy + "-" + mm + "-" + "01";
  }

  public static GetDay(date: string) : string {
    return date.substring(8, 10);
  }

  public static GetMonth(date: string) : string {
    return date.substring(5, 7);
  }

  public static GetYear(date: string) : string {
    return date.substring(0, 4)
  }


  public static CreateUrl(callType: string, startDate: string, endDate: string, filters: string = "none", dimensions: string = "none", columns: string = "all") : string {
    var url: string = `https://dev-app-api.catapultx.com/api/v1/reports/${callType}/${startDate}/${endDate}/${filters}/${dimensions}/${columns}`;
    return url;
  }

  public static FormatDate(date: string) : string {
    var str = date.slice(0, 10);
    const day: string = str.slice(8, 10);
    const month: string = str.slice(5, 7);
    const year: string = str.slice(2, 4);
    return month + "/" + day + "/" + year;
  }
}
