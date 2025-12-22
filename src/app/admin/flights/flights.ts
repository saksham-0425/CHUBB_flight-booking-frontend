import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminFlightService } from '../services/admin-flight';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-admin-flights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flights.html',
  styleUrl: './flights.css'
})
export class Flights implements OnInit, OnDestroy {

  flights: any[] = [];
  loading = false;
  error = '';

  private routerSub!: Subscription;

  constructor(
    private flightService: AdminFlightService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchFlights();
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  fetchFlights(): void {
    this.loading = true;
    this.error = '';

    this.flightService.getAllFlights().subscribe({
      next: (data) => {
        this.flights = data ?? [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load flights';
        this.loading = false;
      }
    });
  }

  editFlight(id: string): void {
  this.router.navigate(['/admin/flights/edit', id]);
}

  deleteFlight(id: string): void {
  if (!confirm('Are you sure you want to delete this flight?')) return;

  this.flightService.deleteFlight(id).subscribe({
    next: () => {
      
      this.flights = this.flights.filter(f => f.id !== id);
    },
    error: (err) => {
      console.error('Delete error:', err);
      alert('Failed to delete flight');
    }
  });
}
}
