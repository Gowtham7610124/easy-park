import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  activeTab: string = 'profile';

  notify = {
    email: true,
    sms: false,
    push: true
  };

  switchTab(tab: string) {
    this.activeTab = tab;
  }
} 
