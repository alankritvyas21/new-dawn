import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-game-basics',
  standalone: true,
  imports: [],
  templateUrl: './game-basics.component.html',
  styleUrl: './game-basics.component.scss'
})
export class GameBasicsComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(private router: Router, public configService: ConfigService, private sharedService: SharedService) {
  }

  startGame() {
    this.router.navigate(['/game-intro']);
    this.sharedService.saveCurrentRoute('/game-intro');
    window.scrollTo(0,0)
  }

}
