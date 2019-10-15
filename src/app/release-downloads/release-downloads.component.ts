import { Component } from '@angular/core';
import { GitHubService } from 'src/app/services/github.service';

@Component({
  selector: 'release-downloads',
  templateUrl: './release-downloads.component.html',
  styleUrls: ['./release-downloads.component.css']
})
export class ReleaseDownloads {
  downloadData: Array<object>;
  software: string = 'vts';

  constructor(private downloadService: GitHubService) {

  }

  ngOnInit() {
    this.downloadService.getDownloadData('virtualphotonics', this.software).subscribe((data: any) => {
      // populate the object
      this.downloadData = data;
    });
  }

  loadSoftware(org: string, repo: string) {
    this.downloadService.getDownloadData(org, repo).subscribe((data: any) => {
      // populate the object
      this.downloadData = data;
    });
  }
}
