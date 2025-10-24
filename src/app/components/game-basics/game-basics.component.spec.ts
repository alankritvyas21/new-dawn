import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBasicsComponent } from './game-basics.component';

describe('GameBasicsComponent', () => {
  let component: GameBasicsComponent;
  let fixture: ComponentFixture<GameBasicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameBasicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameBasicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
