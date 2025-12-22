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

    
      this.authService.saveToken(res.token);

      this.message = 'Login successful';
      this.messageType = 'success';

     
      if (this.authService.isAdmin()) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate([this.redirectUrl]);
      }
    },
    error: () => {
      this.message = 'Invalid email or password';
      this.messageType = 'error';
    }
  });
}

}
