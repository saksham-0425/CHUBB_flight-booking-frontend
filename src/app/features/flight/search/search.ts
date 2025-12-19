import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
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
  hasSearched = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const now = new Date();
    this.today = now.toISOString().split('T')[0];
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  message = '';
  messageType: 'error' | 'warning' | 'info' | 'success' | '' = '';

 search() {
  const source = this.source.trim().toUpperCase();
  const destination = this.destination.trim().toUpperCase();

  // Reset message before every search
  this.message = '';
  this.messageType = '';

  if (!source || !destination || !this.date) {
    this.message = 'Please fill all fields.';
    this.messageType = 'warning';
    return;
  }

  if (this.date < this.today) {
    this.message = 'You cannot search flights for past dates.';
    this.messageType = 'error';
    return;
  }

  if (source === destination) {
    this.message = 'Source and destination cannot be the same.';
    this.messageType = 'error';
    return;
  }

  this.http.get<any[]>(
    'http://localhost:8765/flights/search',
    {
      params: {
        source,
        destination,
        date: this.date
      }
    }
  ).subscribe({
    next: (res) => {
      this.hasSearched = true;
      this.flights = res;

      if (res.length === 0) {
        this.message = 'No flights found for selected route.';
        this.messageType = 'info';
      } else {
        this.message = `${res.length} flights found.`;
        this.messageType = 'success';
      }
    },
    error: () => {
      this.message = 'Something went wrong while searching flights.';
      this.messageType = 'error';
    }
  });
}


  getPrice(flight: any): number {
    const basePrices: Record<string, number> = {
      'Air India': 4500,
      'Indigo': 4000,
      'Vistara': 5200,
      'Fly High': 4200
    };

    let price = basePrices[flight.airline] || 3500;

    if (flight.availableSeats <= 5) {
      price += 1000;
    } else if (flight.availableSeats <= 10) {
      price += 500;
    }

    return price;
  }

  bookFlight(flight: any) {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    this.router.navigate(['/booking'], {
      state: { flight }
    });
  }

  logout() {
    this.authService.logout();
  }
}
