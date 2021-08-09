export class Accumulate {
  public static AccumulateByDate(arrayOfDateMap: Array<Map<string, any>>) {
    var map: Map<string, any> = new Map();
    arrayOfDateMap.forEach((element: Map<string, any>) => {
      var dateStore: string = Array.from(element.keys())[0];
      if (map.has(dateStore)) {
        let temp = map.get(dateStore);
        map.set(dateStore, temp + element.get(Array.from(element.keys())[0]));
      } else {
        map.set(dateStore, Array.from(element.values())[0]);
      }
    });
    return Array.from(map.values());
  }
}

//   public static AccumulateByPublisher(
//     arrayOfPublisherMap: Array<Map<string, any>>
//   ) {
//     var map: Map<string, any> = new Map();
//     arrayOfPublisherMap.forEach((element: Map<string, any>) => {
//       var publisherStore: string = Array.from(element.keys())[0];
//       console.log(publisherStore);
//       if (!map.has(publisherStore)) {
//         map.set(publisherStore, Array.from(element.values())[0]);
//       }
//     });
//     return Array.from(map.values());
//   }
// }

// class Test {

//     static Run() {
//     var map1: Map<any, any> = new Map();
//     var map2: Map<any, any> = new Map();
//     map1.set("hi" , 1);
//     map2.set("hi" , 2);
//     var arr: any[] = new Array();
//     arr[0](map1);
//     arr[1](map2);
//     Accumulate.AccumulateByDate(arr);
//     }

// }
