import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import mainMenuItems from '../../json/mainMenu.json';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss'
})
export class MainMenuComponent implements OnInit {

  @Input() menuItems: any[] = [];
  @Input() title: string = 'Wasteland Survivor';
  @Input() subtitle: string = 'Choose your path in the post-apocalyptic world';
  @Input() showUnlockedOnly: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
    // If no menuItems provided via @Input, use default main menu items
    if (!this.menuItems || this.menuItems.length === 0) {
      this.menuItems = mainMenuItems;
      this.title = 'Wasteland Survivor';
      this.subtitle = 'Choose your path in the post-apocalyptic world';
    }

    if (this.showUnlockedOnly) {
      this.menuItems = this.menuItems.filter(item => item.unlocked);
    }
  }

  navigateToRoute(route: string) {
    this.router.navigate([route]);
    this.sharedService.saveCurrentRoute(route);
  }

  unlockItem(itemId: number) {
    const item = this.menuItems.find(item => item.id === itemId);
    if (item) {
      item.unlocked = true;
      if (this.showUnlockedOnly) {
        this.menuItems = this.menuItems.filter(item => item.unlocked);
      }
    }
  }
}
