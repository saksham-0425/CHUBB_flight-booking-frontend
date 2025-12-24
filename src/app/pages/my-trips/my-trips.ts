import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../core/services/booking';

@Component({
  selector: 'app-my-trips',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-trips.html',
  styleUrls: ['./my-trips.css'],
})
export class MyTrips implements OnInit {

  bookings: any[] = [];
  loading = true;
  error = '';

  constructor(
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(): void {
    this.loading = true;
    this.error = '';

    this.bookingService.getMyBookings().subscribe({
      next: (data: any) => {
        console.log('Bookings received:', data);

        this.bookings = Array.isArray(data) ? data : [data];
        this.loading = false;

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load bookings';
        this.loading = false;

        this.cdr.detectChanges(); 
      }
    });
  }

  cancelBooking(pnr: string): void {
    this.bookingService.cancelBookingByPnr(pnr).subscribe({
      next: () => {
        this.fetchBookings();
      },
      error: () => {
        alert('Unable to cancel booking');
      }
    });
  }
}
