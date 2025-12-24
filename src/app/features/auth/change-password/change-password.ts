import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { passwordPolicyValidator } from '../../../core/validators/password-policy.validator';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.html',
  styleUrls: ['./change-password.css'],
})
export class ChangePassword {

  form!: FormGroup;
  isLoading = false;

  message = '';
  messageType: 'success' | 'error' | 'warning' | 'info' | '' = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, passwordPolicyValidator]],
      confirmPassword: ['', Validators.required],
    });
  }

  isRuleValid(rule: string): boolean {
    const errors = this.form.get('newPassword')?.errors?.['passwordPolicy'];
    if (!errors) return true;
    return errors[rule];
  }

  submit() {
    this.message = '';
    this.messageType = '';

    if (this.form.invalid) {
      this.message = 'Please fix the errors before submitting.';
      this.messageType = 'warning';
      return;
    }

    const { oldPassword, newPassword, confirmPassword } = this.form.value;

    if (newPassword !== confirmPassword) {
      this.message = 'New password and confirm password do not match.';
      this.messageType = 'error';
      return;
    }

    this.isLoading = true;

    this.authService.changePassword(oldPassword, newPassword).subscribe({
      next: (res) => {
        this.message = res;
        this.messageType = 'success';
        this.form.reset();

        setTimeout(() => {
          this.router.navigate(['/search']);
        }, 1500);
      },
      error: (err) => {
        this.message = err?.error || 'Failed to change password.';
        this.messageType = 'error';
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
