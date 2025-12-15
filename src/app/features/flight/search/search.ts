import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./search.css'],
})
export class Search implements OnInit {

  source = '';
  destination = '';
  date = '';
  flights: any[] = [];
  today!: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const now = new Date();
    this.today = now.toISOString().split('T')[0];
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  search() {
    if (this.date < this.today) {
      alert('You cannot search flights for past dates.');
      return;
    }

    this.http.get<any[]>(
      'http://localhost:8765/flights/search',
      {
        params: {
          source: this.source.trim().toUpperCase(),
          destination: this.destination.trim().toUpperCase(),
          date: this.date
        }
      }
    ).subscribe(res => {
      this.flights = res;
    });
  }

  logout() {
    this.authService.logout();
  }
}
