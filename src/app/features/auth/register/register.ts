import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
    });
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value || '';

    const errors = {
      minLength: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /[0-9]/.test(value),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      noSpace: !/\s/.test(value),
    };

    const isValid = Object.values(errors).every(Boolean);

    return isValid ? null : { passwordPolicy: errors };
  }

  get passwordErrors() {
    return this.registerForm.get('password')?.errors?.['passwordPolicy'];
  }

  submit() {
    if (this.registerForm.invalid) return;

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Registration failed');
      },
    });
  }
  isRuleValid(rule: string): boolean {
  const control = this.registerForm.get('password');
  const errors = control?.errors?.['passwordPolicy'];

  if (!errors) return true;

  return errors[rule];
}

}
