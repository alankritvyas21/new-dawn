import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { ConfigService } from '../../services/config.service';
import bathroomItems from '../../json/bathroom.json';
import bedroomItems from '../../json/bedroom.json';
import kitchenItems from '../../json/kitchen.json';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent implements OnInit {
  
  @Input() roomActions: any[] = [];
  @Input() roomTitle: string = 'Room';
  @Input() roomSubtitle: string = 'Room description';
  @Input() roomImage: string = '';
  @Input() backRoute: string = '/main-menu';
  @Input() showUnlockedOnly: boolean = true;
  @Input() gridColumns: string = 'col-12 col-md-6 col-lg-4'; // Default grid columns
  
  @Output() actionPerformed = new EventEmitter<{action: string, actionData: any}>();

  availableActions: any[] = [];
  currentRoom: string = '';

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    public configService: ConfigService, 
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
    // Get current route to determine room configuration
    this.currentRoom = this.route.snapshot.url[0]?.path || '';
    
    // Configure room based on current route
    this.configureRoom();
    
    if (this.showUnlockedOnly) {
      this.availableActions = this.roomActions.filter(action => action.unlocked);
    } else {
      this.availableActions = this.roomActions;
    }
  }

  private configureRoom(): void {
    switch(this.currentRoom) {
      case 'bathroom':
        this.roomActions = bathroomItems;
        this.roomTitle = 'Bathroom';
        this.roomSubtitle = 'Maintain your hygiene and health';
        this.roomImage = this.configService.getImageUrl() + 'bathroom.jpg';
        this.gridColumns = 'col-12 col-md-6 col-lg-4';
        break;
      case 'bedroom':
        this.roomActions = bedroomItems;
        this.roomTitle = 'Bedroom';
        this.roomSubtitle = 'Rest and recover your strength';
        this.roomImage = this.configService.getImageUrl() + 'bedroom.png';
        this.gridColumns = 'col-12 col-md-6 col-lg-2';
        break;
      case 'kitchen':
        this.roomActions = kitchenItems;
        this.roomTitle = 'Kitchen';
        this.roomSubtitle = 'Manage your food and nutrition';
        this.roomImage = this.configService.getImageUrl() + 'kitchen.jpg';
        this.gridColumns = 'col-12 col-md-6 col-lg-3';
        break;
      default:
        // Use input values if no route match
        break;
    }
  }

  performAction(action: string) {
    console.log(`Performing room action: ${action}`);
    
    // Find the action data
    const actionData = this.roomActions.find(a => a.action === action);
    
    // Handle room-specific game logic
    this.handleRoomAction(action);
    
    // Emit the action to parent component for custom handling
    this.actionPerformed.emit({ action, actionData });
  }

  private handleRoomAction(action: string): void {
    switch(this.currentRoom) {
      case 'bathroom':
        this.handleBathroomAction(action);
        break;
      case 'bedroom':
        this.handleBedroomAction(action);
        break;
      case 'kitchen':
        this.handleKitchenAction(action);
        break;
    }
  }

  private handleBathroomAction(action: string): void {
    switch(action) {
      case 'shower':
        this.sharedService.updateEnergy(-10);
        this.sharedService.updateHealth(20);
        this.sharedService.advanceTime(30); // 30 minutes
        break;
      case 'bath':
        this.sharedService.updateEnergy(-15);
        this.sharedService.updateHealth(30);
        this.sharedService.advanceTime(60); // 1 hour
        break;
      case 'washHands':
        this.sharedService.updateEnergy(-5);
        this.sharedService.updateHealth(5);
        this.sharedService.advanceTime(5); // 5 minutes
        break;
      case 'brushTeeth':
        this.sharedService.updateEnergy(-3);
        this.sharedService.updateHealth(5);
        this.sharedService.advanceTime(10); // 10 minutes
        break;
      case 'useToilet':
        this.sharedService.updateEnergy(-2);
        this.sharedService.updateHealth(10);
        this.sharedService.advanceTime(5); // 5 minutes
        break;
      case 'meditation':
        this.sharedService.updateHealth(15);
        this.sharedService.advanceTime(30); // 30 minutes
        break;
    }
  }

  private handleBedroomAction(action: string): void {
    if(action == "sleep") {
      this.sharedService.updateEnergy(100);
      this.sharedService.updateHealth(50);
      this.sharedService.advanceTime(480); // 8 hours
    } else if(action == "nap") {
      this.sharedService.updateEnergy(30);
      this.sharedService.advanceTime(120); // 2 hours
    } else if(action == "readBook") {
      this.sharedService.updateHealth(5);
      this.sharedService.advanceTime(60); // 1 hour
    } else if(action == "exercise") {
      this.sharedService.updateEnergy(-20);
      this.sharedService.updateHealth(10);
      this.sharedService.advanceTime(30); // 30 minutes
    }
  }

  private handleKitchenAction(action: string): void {
    switch(action) {
      case 'eatFood':
        this.sharedService.updateEnergy(40);
        this.sharedService.updateHealth(20);
        this.sharedService.advanceTime(30); // 30 minutes
        break;
      case 'eatSnacks':
        this.sharedService.updateEnergy(15);
        this.sharedService.advanceTime(10); // 10 minutes
        break;
      case 'cookMeal':
        this.sharedService.updateEnergy(-20);
        this.sharedService.updateHealth(50);
        this.sharedService.advanceTime(120); // 2 hours
        break;
      case 'bakeBread':
        this.sharedService.updateEnergy(-15);
        this.sharedService.updateHealth(30);
        this.sharedService.advanceTime(90); // 1.5 hours
        break;
      case 'brewCoffee':
        this.sharedService.updateEnergy(25);
        this.sharedService.advanceTime(15); // 15 minutes
        break;
      case 'preserveFood':
        this.sharedService.updateEnergy(-10);
        this.sharedService.updateHealth(10);
        this.sharedService.advanceTime(60); // 1 hour
        break;
    }
  }

  goBack() {
    this.router.navigate([this.backRoute]);
    this.sharedService.saveCurrentRoute(this.backRoute);
  }

  unlockAction(actionId: number) {
    const action = this.roomActions.find(a => a.id === actionId);
    if (action) {
      action.unlocked = true;
      if (this.showUnlockedOnly) {
        this.availableActions = this.roomActions.filter(action => action.unlocked);
      }
    }
  }
}
