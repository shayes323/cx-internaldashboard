export class DateFormatter {
     
    public date: string;
 
    constructor(date: string) {
        this.date = date
    }

    public format(): string {
        var str: string = this.date;
        str = str.slice(0, -9);
        const day: string = str.slice(8, 10);
        const month: string = str.slice(5, 7);
        const year: string = str.slice(2, 4);
        return month + "/" + day + "/" + year;
    }

    




}