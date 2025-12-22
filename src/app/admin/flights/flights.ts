import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminFlightService } from '../services/admin-flight';

@Component({
  selector: 'app-admin-flights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flights.html',
  styleUrl: './flights.css'
})
export class Flights implements OnInit {

  flights: any[] = [];
  message = '';
  messageType: 'success' | 'error' | '' = '';

  constructor(
    private flightService: AdminFlightService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFlights();
  }

  loadFlights() {
  this.flightService.getAllFlights().subscribe({
    next: (data) => {
      console.log('Flights:', data);
      this.flights = [...data]; 
    },
    error: () => {
      this.message = 'Failed to load flights';
      this.messageType = 'error';
    }
  });
}

  editFlight(id: string) {
    this.router.navigate(['/admin/flights/edit', id]);
  }

  deleteFlight(id: string) {
    const confirmDelete = confirm('Are you sure you want to delete this flight?');

    if (!confirmDelete) return;

    this.flightService.deleteFlight(id).subscribe({
      next: () => {
        this.message = 'Flight deleted successfully';
        this.messageType = 'success';
        this.loadFlights();
      },
      error: () => {
        this.message = 'Failed to delete flight';
        this.messageType = 'error';
      }
    });
  }
}
