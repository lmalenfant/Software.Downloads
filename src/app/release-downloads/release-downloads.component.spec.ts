import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, async, ComponentFixtureAutoDetect, inject } from '@angular/core/testing';
import { ReleaseDownloads } from './release-downloads.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { GitHubService } from '../services/github.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('release-downloads', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReleaseDownloads
      ],
      imports: [ FormsModule, BrowserModule, HttpClientTestingModule ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        GitHubService
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  }));

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should have data', async(() => {
    inject([HttpTestingController, GitHubService],
        (httpMock: HttpTestingController, service: GitHubService) => {
            // set the test parameters
            let org = "";
            let repo = "";
            // call the service
            service.getDownloadData(org, repo).subscribe((data: any) => {
                console.log('get download data from GitHub');
            });
            // set the expectations for the HttpClient mock
            const req = httpMock.expectOne('https://api.github.com/repos/virtualphotonics/vts/releases');
            expect(req.request.method).toEqual('GET');
            // set the fake data to be returned by the mock
            req.flush({});
    });
  }));
});
