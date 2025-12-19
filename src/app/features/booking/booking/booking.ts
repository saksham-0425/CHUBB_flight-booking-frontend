import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from '../../../core/services/booking';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.html',
  styleUrls: ['./booking.css']
})
export class Booking implements OnInit {

  flight: any;

  passengerName = '';
  email = '';
  seats = 1;

  isSubmitting = false;

  message = '';
  messageType: 'success' | 'error' | 'warning' | '' = '';

  pnr: string | null = null;

  constructor(
    private router: Router,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.flight = history.state.flight;

    if (!this.flight?.id) {
      this.router.navigate(['/search']);
    }
  }

  confirmBooking() {
    if (!this.passengerName || !this.email) {
      this.message = 'Please fill passenger details';
      this.messageType = 'warning';
      return;
    }

    if (this.isSubmitting || this.pnr) return;

    this.isSubmitting = true;
    this.message = '';
    this.messageType = '';

    const payload = {
      flightId: this.flight.id,
      passengerName: this.passengerName,
      email: this.email,
      seats: this.seats
    };

    this.bookingService.createBooking(payload).subscribe({
      next: (res: any) => {
        this.isSubmitting = false;
        this.pnr = res.pnr;
        this.message = `Booking confirmed! Your PNR is ${res.pnr}`;
        this.messageType = 'success';
      },
      error: err => {
        this.isSubmitting = false;
        this.message =
          err.status === 409
            ? 'Booking already exists for this flight'
            : 'Booking failed. Please try again';
        this.messageType = 'error';
      }
    });
  }
  goToTrackBooking() {
    this.router.navigate(['/track-booking']);
  }

  goToHome() {
    this.router.navigate(['/search']);
  }
}
