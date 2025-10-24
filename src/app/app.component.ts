import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private sharedService: SharedService) {
  }
  ngOnInit(): void {
    const currentRoute = this.sharedService.getCurrentRoute();
    if(currentRoute && currentRoute !== '/') {
      this.router.navigate([currentRoute]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
