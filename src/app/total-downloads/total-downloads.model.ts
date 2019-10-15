export class DownloadCount {
    software: string;
    year: number;
    count: number;

    constructor(software: string, year: number, count: number) {
        this.software = software;
        this.year = year;
        this.count = count;
    }
}