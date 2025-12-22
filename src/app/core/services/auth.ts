import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8765/auth';
  private TOKEN_KEY = 'jwt_token';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  register(data: any) {
    return this.http.post(
      `${this.baseUrl}/register`,
      data,
      { responseType: 'text' }
    );
  }

  login(data: any) {
    return this.http.post<any>(`${this.baseUrl}/login`, data);
  }

  // ✅ call this after successful login
  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/search']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  private getTokenPayload(): any {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) return null;

    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }

  getRoles(): string[] {
    const payload = this.getTokenPayload();
    return payload?.roles || [];
  }

  isAdmin(): boolean {
    return this.getRoles().includes('ROLE_ADMIN');
  }
}
