import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminFlightService } from '../services/admin-flight';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-flights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flights.html',
  styleUrl: './flights.css'
})
export class Flights implements OnInit {

  flights: any[] = [];
  loading = true;
  error = '';

  showConfirmPopup = false;
  selectedFlightId: string | null = null;

  constructor(
    private flightService: AdminFlightService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchFlights();
  }

  fetchFlights(): void {
    this.loading = true;
    this.error = '';

    this.flightService.getAllFlights().subscribe({
      next: (data) => {
        console.log('Flights received:', data);
        this.flights = data ?? [];
        this.loading = false;
        this.cdr.detectChanges(); // 🔥 key line
      },
      error: () => {
        this.error = 'Failed to load flights';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  editFlight(id: string): void {
    this.router.navigate(['/admin/flights/edit', id]);
  }

  openDeletePopup(id: string): void {
    this.selectedFlightId = id;
    this.showConfirmPopup = true;
  }

  cancelDelete(): void {
    this.showConfirmPopup = false;
    this.selectedFlightId = null;
  }

  confirmDelete(): void {
    if (!this.selectedFlightId) return;

    this.flightService.deleteFlight(this.selectedFlightId).subscribe({
      next: () => {
        this.flights = this.flights.filter(
          f => f.id !== this.selectedFlightId
        );
        this.cancelDelete();
        this.cdr.detectChanges();
      },
      error: () => {
        alert('Failed to delete flight');
        this.cancelDelete();
      }
    });
  }
}
