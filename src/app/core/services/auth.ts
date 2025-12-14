import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8765/auth';

  constructor(private http: HttpClient) {}

  // ✅ REGISTER
  register(data: any) {
    return this.http.post(
      `${this.baseUrl}/register`,
      data,
      { responseType: 'text' } // 🔥 IMPORTANT
    );
  }

  // ✅ LOGIN
  login(data: any) {
    return this.http.post<any>(
      `${this.baseUrl}/login`,
      data
    );
  }

  // ✅ LOGOUT
  logout() {
    localStorage.removeItem('jwt_token');
  }

  // ✅ AUTH CHECK
  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt_token');
  }
}
