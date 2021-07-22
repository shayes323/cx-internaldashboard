export class Num {


    public static RoundNum(num: any) {
        return (Math.round(num * 100) / 100).toFixed(4);
    }
}