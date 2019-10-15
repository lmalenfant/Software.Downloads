import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GitHubService } from 'src/app/services/github.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReleaseDownloads } from './release-downloads/release-downloads.component';
import { TotalDownloads } from './total-downloads/total-downloads.component';
import { DownloadFilterPipe } from './total-downloads/release-downloads.filter';

@NgModule({
  declarations: [
    AppComponent,
    ReleaseDownloads,
    TotalDownloads,
    DownloadFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [GitHubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
