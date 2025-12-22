import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8765/auth';

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(
      `${this.baseUrl}/register`,
      data,
      { responseType: 'text' }
    );
  }

  login(data: any) {
    return this.http.post<any>(
      `${this.baseUrl}/login`,
      data
    );
  }

  logout() {
    localStorage.removeItem('jwt_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt_token');
  }

  private getTokenPayload(): any {
    const token = localStorage.getItem('jwt_token');
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
