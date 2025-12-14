import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {

  source = '';
  destination = '';
  date = '';
  flights: any[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  search() {
    this.http.get<any[]>(
      `http://localhost:8765/flights/search`,
      {
        params: {
          source: this.source,
          destination: this.destination,
          date: this.date
        }
      }
    ).subscribe(res => this.flights = res);
  }

  logout() {
    this.authService.logout();
  }
}
