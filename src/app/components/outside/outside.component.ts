import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from '../main-menu/main-menu.component';
import outsideMenuItems from '../../json/outside.json';

@Component({
  selector: 'app-outside',
  standalone: true,
  imports: [CommonModule, MainMenuComponent],
  templateUrl: './outside.component.html',
  styleUrl: './outside.component.scss'
})
export class OutsideComponent implements OnInit {
  
  menuItems = outsideMenuItems;
  title = 'Outside World';
  subtitle = 'Explore the wasteland and discover new areas';

  ngOnInit(): void {
    // Component initialization logic if needed
  }
}
