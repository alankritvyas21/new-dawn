import { Injectable } from '@angular/core';

export interface PlayerData {
  day: number;
  minutes: number;
  hours: number;
  playerName: string;
  energyLevel: number;
  health: number;
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public playerData: PlayerData = {
    day: 1,
    minutes: 0,
    hours: 8,
    playerName: "",
    energyLevel: 100,
    health: 100
  };

  constructor() {
    this.loadPlayerData();
  }

  saveCurrentRoute(route: string) {
    localStorage.setItem('currentRoute', route);
  }

  getCurrentRoute() {
    return localStorage.getItem('currentRoute');
  }

  getPlayerData(): PlayerData {
    return { ...this.playerData };
  }

  updatePlayerData(updates: Partial<PlayerData>) {
    this.playerData = { ...this.playerData, ...updates };
    this.savePlayerData();
  }

  savePlayerData() {
    localStorage.setItem('playerData', JSON.stringify(this.playerData));
  }

  loadPlayerData() {
    const saved = localStorage.getItem('playerData');
    if (saved) {
      this.playerData = { ...this.playerData, ...JSON.parse(saved) };
    }
  }

  advanceTime(minutes: number) {
    this.playerData.minutes += minutes;

    while (this.playerData.minutes >= 60) {
      this.playerData.minutes -= 60;
      this.playerData.hours += 1;
    }

    while (this.playerData.hours >= 24) {
      this.playerData.hours -= 24;
      this.playerData.day += 1;
    }

    this.savePlayerData();
  }

  get formattedTime(): string {
    const hh = this.playerData.hours.toString().padStart(2, '0');
    const mm = this.playerData.minutes.toString().padStart(2, '0');
    return `Day ${this.playerData.day} - ${hh}:${mm}`;
  }

  updateEnergy(change: number) {
    this.playerData.energyLevel = Math.max(0, Math.min(100, this.playerData.energyLevel + change));
    this.savePlayerData();
  }

  updateHealth(change: number) {
    this.playerData.health = Math.max(0, Math.min(100, this.playerData.health + change));
    this.savePlayerData();
  }

  setPlayerName(name: string) {
    this.playerData.playerName = name;
    this.savePlayerData();
  }

  getFormattedTime(): string {
    return `Day ${this.playerData.day} - ${this.playerData.hours}:${this.playerData.minutes.toString().padStart(2, '0')}`;
  }
}
