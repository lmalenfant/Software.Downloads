import { Component } from '@angular/core';
import { GitHubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'VP Software Downloads';

  constructor(private downloadService: GitHubService) {
  }

  ngOnInit() {
  }
}
