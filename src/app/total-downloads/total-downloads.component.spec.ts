import { TestBed, async, ComponentFixtureAutoDetect, inject } from '@angular/core/testing';
import { TotalDownloads } from './total-downloads.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { GitHubService } from '../services/github.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DownloadFilterPipe } from './release-downloads.filter';

describe('total-downloads', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TotalDownloads, DownloadFilterPipe
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
            const req1 = httpMock.expectOne('https://api.github.com/repos/virtualphotonics/vts/releases');
            const req2 = httpMock.expectOne('https://api.github.com/repos/virtualphotonics/Vts.Gui.Wpf/releases');
            const req3 = httpMock.expectOne('https://api.github.com/repos/virtualphotonics/MieSimulatorGUI/releases');
            expect(req1.request.method).toEqual('GET');
            expect(req2.request.method).toEqual('GET');
            expect(req3.request.method).toEqual('GET');
            // set the fake data to be returned by the mock
            req1.flush({});
            req2.flush({});
            req3.flush({});
    });
  }));
});
