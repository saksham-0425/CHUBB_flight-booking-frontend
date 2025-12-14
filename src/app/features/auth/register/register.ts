import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { Login } from '../login/login';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // ✅ Initialize form AFTER fb is available
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]      
    });
  }

  submit() {
    if (this.registerForm.invalid) return;

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        alert('Registration successful. Please login.');
        this.router.navigate(['/login']);
      },
      error: () => alert('Registration failed'),
    });
  }
}
