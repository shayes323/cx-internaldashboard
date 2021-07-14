export class Day {

  public static getToday() {
    var today: any = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    return today = yyyy + "-" + mm + "-" + dd;
  }
  
}
