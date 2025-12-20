import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm!: FormGroup;

  message = '';
  messageType: 'error' | 'success' | 'warning' | '' = '';

  redirectUrl = '/search'; // default

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.route.queryParams.subscribe(params => {
      if (params['redirect']) {
        this.redirectUrl = params['redirect'];
      }
    });
  }

  submit() {
    if (this.loginForm.invalid) {
      this.message = 'Please enter valid credentials';
      this.messageType = 'warning';
      return;
    }

    this.message = '';
    this.messageType = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('jwt_token', res.token);

        this.message = 'Login successful';
        this.messageType = 'success';

        setTimeout(() => {
          this.router.navigate([this.redirectUrl]);
        }, 500);
      },
      error: () => {
        this.message = 'Invalid email or password';
        this.messageType = 'error';
      }
    });
  }
}
