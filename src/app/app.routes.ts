import { Routes } from '@angular/router';
import { GameBasicsComponent } from './components/game-basics/game-basics.component';
import { GameIntroComponent } from './components/game-intro/game-intro.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { RoomComponent } from './components/room/room.component';
import { OutsideComponent } from './components/outside/outside.component';

export const routes: Routes = [
    { path: '', component: GameBasicsComponent },
    { path: 'game-intro', component: GameIntroComponent },
    { path: 'main-menu', component: MainMenuComponent},
    { path: 'bathroom', component: RoomComponent },
    { path: 'bedroom', component: RoomComponent },
    { path: 'kitchen', component: RoomComponent },
    { path: 'outside', component: OutsideComponent },
    { path:'*', redirectTo: '' }
];
