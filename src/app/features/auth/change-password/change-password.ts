import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-password.html',
  styleUrls: ['./change-password.css'],
})
export class ChangePassword {

  oldPassword = '';
  newPassword = '';
  confirmPassword = '';

  isLoading = false;

  message = '';
  messageType: 'success' | 'error' | 'warning' | 'info' | '' = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  submit() {
    this.message = '';
    this.messageType = '';

    if (!this.oldPassword || !this.newPassword || !this.confirmPassword) {
      this.message = 'All fields are required.';
      this.messageType = 'warning';
      return;
    }

    if (this.newPassword.length < 6) {
      this.message = 'New password must be at least 6 characters.';
      this.messageType = 'error';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.message = 'New password and confirm password do not match.';
      this.messageType = 'error';
      return;
    }

    this.isLoading = true;

    this.authService
      .changePassword(this.oldPassword, this.newPassword)
      .subscribe({
        next: (res) => {
          this.message = res;
          this.messageType = 'success';

          this.oldPassword = '';
          this.newPassword = '';
          this.confirmPassword = '';

          // optional redirect after success
          setTimeout(() => {
            this.router.navigate(['/search']);
          }, 1500);
        },
        error: (err) => {
          this.message =
            err?.error || 'Failed to change password.';
          this.messageType = 'error';
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }
}
