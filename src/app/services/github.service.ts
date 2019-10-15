import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class GitHubService {
    downloadObjects: Array<object>;
    constructor(private http: HttpClient) {
  }

  baseUrl = "https://api.github.com/repos/";

  ngOnInit() {
    this.currentDownloadObjects.subscribe(downloadObjects => this.downloadObjects = downloadObjects);
  }

  private allDownloadDataSource = new BehaviorSubject(new Array<object>());
  currentDownloadObjects = this.allDownloadDataSource.asObservable();

  getDownloadData(org: string, repo: string) {
    let url = this.baseUrl + org + "/" + repo + "/releases";
    return this.http.get(url);
  }
}
