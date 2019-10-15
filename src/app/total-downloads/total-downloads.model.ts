export class DownloadCount {
    software: string;
    softwareDescription: string;
    year: number;
    count: number;

    constructor(software: string, softwareDescription: string, year: number, count: number) {
        this.software = software;
        this.softwareDescription = softwareDescription;
        this.year = year;
        this.count = count;
    }
}