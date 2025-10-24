import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { Router, RouterOutlet } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;

  constructor(public configService: ConfigService, private router: Router, public sharedService: SharedService) {
  }
  ngOnInit(): void {
    this.isCollapsed = window.innerWidth < 768;
    // Load player data from localStorage
    this.sharedService.loadPlayerData();
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }


  get energyColor(): string {
    if (this.sharedService.playerData.energyLevel > 60) return '#00ff88';
    if (this.sharedService.playerData.energyLevel > 30) return '#ffcc33';
    return '#ff4444';
  }

  get healthColor(): string {
    if (this.sharedService.playerData.health > 60) return '#ff4d4d';
    if (this.sharedService.playerData.health > 30) return '#ff9999';
    return '#990000';
  }

  
  navigateHome() {
    this.router.navigate(['/']);
    this.sharedService.saveCurrentRoute('/');
  }
}
