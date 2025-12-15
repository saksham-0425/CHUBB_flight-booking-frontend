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
  hasSearched = false;

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

  const source = this.source.trim().toUpperCase();
    const destination = this.destination.trim().toUpperCase();


    if (!source || !destination || !this.date) {
      alert('Please fill all fields.');
      return;
    }  
 
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
    this.hasSearched = true; 
    this.flights = res;
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



  logout() {
    this.authService.logout();
  }
}
