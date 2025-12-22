import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';


import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
export class AdminLayout {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get isAdminLoggedIn(): boolean {
    return this.authService.isLoggedIn() && this.authService.isAdmin();
  }

  logout(): void {
    this.authService.logout();
  }

  goToProfile(): void {
  alert('Profile page coming soon');
}
}
