import { Component, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isMobile = false;
  showSidebar = true;
  router=inject(Router);

  constructor() {
    this.checkScreenSize();
  }

  // Detect screen resize
  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    this.showSidebar = !this.isMobile; // Default: show only on desktop
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  onNavClick() {
    if (this.isMobile) {
      this.showSidebar = false;
    }
  }

  logout(): void {
  localStorage.removeItem('parkUser'); // or use clear() to remove everything
  this.router.navigate(['/']); // Redirect to login or home page
}
}
