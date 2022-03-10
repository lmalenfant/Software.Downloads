import { Component, Input } from '@angular/core';
import { GitHubService } from 'src/app/services/github.service';
import { DownloadCount } from './total-downloads.model';
import { MonthList } from './month-list';
import { Month } from './month.model';
import { Version } from 'src/app/version.model';

@Component({
  selector: 'total-downloads',
  templateUrl: './total-downloads.component.html',
  styleUrls: ['./total-downloads.component.css']
})
export class TotalDownloads {
    vts: Array<Version> = [];
    wpf: Array<Version> = [];
    mie: Array<Version> = [];
    mccl: Array<Version> = [];
    software: Array<DownloadCount> = [];
    downloadMonth: Month = { value: 0, display: 'January' };
    @Input('monthList') monthList = MonthList;
    years: Array<number> = [];
    month: Array<string> = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    previousMonth: string = "December";

  constructor(private downloadService: GitHubService) {
  }

  onChange(value: number) {
    this.downloadMonth.value = value;
    let monthValue = value - 1;
    if (monthValue < 0) {
        monthValue = 11;
    }
    this.previousMonth = this.month[monthValue]
    this.years = [];
    this.software = [];
    this.updateDownloadData();
  }

  ngOnInit() {
    this.updateDownloadData();
  }

  updateDownloadData() {
    this.downloadService.getDownloadData('virtualphotonics', 'Vts').subscribe((data: any) => {
        // populate the object
        this.vts = data;
        this.vts.forEach(release => {
            let releaseDate: Date = new Date(release["published_at"]);
            let releaseYear: number = this.getCustomYear(releaseDate, this.downloadMonth.value);
            let assets = release["assets"];
            assets.forEach(asset => {
                let name: string = asset["name"];
                let downloadCount: number = asset["download_count"];
                if (name.includes("MC_")) {
                    if (this.software.length > 0) {
                        let counted = false;
                        this.software.forEach(element => {
                            if (element.year === releaseYear && element.software === "mccl-vts") {
                                element.count += downloadCount;
                                counted = true;
                            }
                        });
                        if (!counted) {
                            let thing: DownloadCount = new DownloadCount("mccl-vts", "MCCL - VTS", releaseYear, downloadCount);
                            this.software.push(thing);
                        }
                    } else {
                        let thing: DownloadCount = new DownloadCount("mccl-vts", "MCCL - VTS", releaseYear, downloadCount);
                        this.software.push(thing);
                    }
                } else {
                    if (this.software.length > 0) {
                        let counted = false;
                        this.software.forEach(element => {
                            if (element.year === releaseYear && element.software === "matlab") {
                                element.count += downloadCount;
                                counted = true;
                            }
                        });
                        if (!counted) {
                            let thing: DownloadCount = new DownloadCount("matlab", "MATLAB", releaseYear, downloadCount);
                            this.software.push(thing);
                        }
                    } else {
                        let thing: DownloadCount = new DownloadCount("matlab", "MATLAB", releaseYear, downloadCount);
                        this.software.push(thing);
                    }
                }
            });
        });
        this.updateYears();
        console.log(this.years);
    });
    this.downloadService.getDownloadData('virtualphotonics', 'Vts.Gui.Wpf').subscribe((data: any) => {
        // populate the object
        this.wpf = data;
        this.wpf.forEach(release => {
            let releaseDate: Date = new Date(release["published_at"]);
            let releaseYear: number = this.getCustomYear(releaseDate, this.downloadMonth.value);
            let assets = release["assets"];
            assets.forEach(asset => {
                let downloadCount: number = asset["download_count"];
                if (this.software.length > 0) {
                    let counted = false;
                    this.software.forEach(element => {
                        if (element.year === releaseYear && element.software === "wpf") {
                            element.count += downloadCount;
                            counted = true;
                        }
                    });
                    if (!counted) {
                        let thing: DownloadCount = new DownloadCount("wpf", "WPF", releaseYear, downloadCount);
                        this.software.push(thing);
                    }
                } else {
                    let thing: DownloadCount = new DownloadCount("wpf", "WPF", releaseYear, downloadCount);
                    this.software.push(thing);
                }
            });
        });
        console.log(this.software);
        this.updateYears();
        console.log(this.years);
    });
    this.downloadService.getDownloadData('virtualphotonics', 'Vts.MonteCarlo').subscribe((data: any) => {
        // populate the object
        this.mccl = data;
        this.mccl.forEach(release => {
            let releaseDate: Date = new Date(release["published_at"]);
            let releaseYear: number = this.getCustomYear(releaseDate, this.downloadMonth.value);
            let assets = release["assets"];
            assets.forEach(asset => {
                let downloadCount: number = asset["download_count"];
                if (this.software.length > 0) {
                    let counted = false;
                    this.software.forEach(element => {
                        if (element.year === releaseYear && element.software === "mccl") {
                            element.count += downloadCount;
                            counted = true;
                        }
                    });
                    if (!counted) {
                        let thing: DownloadCount = new DownloadCount("mccl", "MCCL", releaseYear, downloadCount);
                        this.software.push(thing);
                    }
                } else {
                    let thing: DownloadCount = new DownloadCount("mccl", "MCCL", releaseYear, downloadCount);
                    this.software.push(thing);
                }
            });
        });
        console.log(this.software);
        this.updateYears();
        console.log(this.years);
    });
    this.downloadService.getDownloadData('virtualphotonics', 'MieSimulatorGUI').subscribe((data: any) => {
        // populate the object
        this.mie = data;
        this.mie.forEach(release => {
            let releaseDate: Date = new Date(release["published_at"]);
            let releaseYear: number = this.getCustomYear(releaseDate, this.downloadMonth.value);
            let assets = release["assets"];
            assets.forEach(asset => {
                let downloadCount: number = asset["download_count"];
                if (this.software.length > 0) {
                    let counted = false;
                    this.software.forEach(element => {
                        if (element.year === releaseYear && element.software === "mie") {
                            element.count += downloadCount;
                            counted = true;
                        }
                    });
                    if (!counted) {
                        let thing: DownloadCount = new DownloadCount("mie", "Mie Simulator", releaseYear, downloadCount);
                        this.software.push(thing);
                    }
                } else {
                    let thing: DownloadCount = new DownloadCount("mie", "Mie Simulator", releaseYear, downloadCount);
                    this.software.push(thing);
                }
            });
        });
        console.log(this.software);
        this.updateYears();
        console.log(this.years);
    });
  }

  updateYears() {
    this.software.forEach(element => {
            if (!this.years.includes(element.year)) {
                this.years.push(element.year);
            }
        });
}

  getCustomYear(releaseDate: Date, month: number) {
    let releaseYear: number = releaseDate.getFullYear();  
    let releaseMonth: number = releaseDate.getMonth(); 
    // 0 month is January so pass the month value accordingly
    if (releaseMonth >= month) {
        return releaseYear;
    } else {
        return releaseYear - 1;
    }
  }
}
