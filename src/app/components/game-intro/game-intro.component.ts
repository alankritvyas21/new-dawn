import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-intro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './game-intro.component.html',
  styleUrl: './game-intro.component.scss'
})
export class GameIntroComponent implements OnInit {
  nameForm!: FormGroup;
  constructor(public configService: ConfigService, private router: Router, private sharedService: SharedService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.nameForm = this.fb.group({
      playerName: ['']
    });
  }

  goToMainMenu() {
    if (!this.sharedService.playerData.playerName) {
      this.sharedService.setPlayerName('John Doe');
    }
    this.router.navigate(['main-menu']);
    this.sharedService.saveCurrentRoute('/main-menu')
  }

}
