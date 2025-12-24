import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../core/services/booking';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-track-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './track-booking.html',
  styleUrls: ['./track-booking.css'],
})
export class TrackBooking {
  pnr = '';
  booking: any = null;

  isLoading = false;
  isCancelling = false;

  showCancelConfirm = false;

  message = '';
  messageType: 'success' | 'error' | 'warning' | 'info' | '' = '';

  constructor(
    private bookingService: BookingService,
    private router: Router,
    private authService: AuthService
  ) {}

  searchBooking() {
    if (this.isLoading) return;

    const pnrValue = this.pnr.trim().toUpperCase();

    this.resetState();

    if (!pnrValue) {
      this.message = 'Please enter a PNR';
      this.messageType = 'warning';
      return;
    }

    this.isLoading = true;

    this.bookingService.getBookingByPnr(pnrValue).subscribe({
      next: (res: any) => {
        this.booking = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;

        if (err.status === 401) {
          this.message = 'Please login to view booking details';
          this.messageType = 'warning';

          setTimeout(() => {
            this.router.navigate(['/login'], {
              queryParams: { redirect: 'track-booking' },
            });
          }, 1500);
        } else if (err.status === 404) {
          this.message = 'No booking found for this PNR';
          this.messageType = 'error';
        } else {
          this.message = 'Unable to fetch booking details';
          this.messageType = 'error';
        }
      },
    });
  }

  openCancelConfirm() {
    this.showCancelConfirm = true;
  }

  closeCancelConfirm() {
    this.showCancelConfirm = false;
  }

 confirmCancel() {
  if (!this.booking || this.isCancelling) return;

  this.isCancelling = true;
  this.message = '';
  this.messageType = '';

  const pnr = this.booking.pnr;

  this.bookingService.cancelBookingByPnr(pnr).subscribe({
    next: () => {
      // ✅ Re-fetch booking after cancel
      this.bookingService.getBookingByPnr(pnr).subscribe({
        next: (updatedBooking: any) => {
          this.booking = updatedBooking;
          this.isCancelling = false;
          this.showCancelConfirm = false;

          this.message = 'Ticket cancelled successfully';
          this.messageType = 'success';
        },
        error: () => {
          this.isCancelling = false;
          this.showCancelConfirm = false;

          this.message = 'Cancelled, but failed to refresh booking';
          this.messageType = 'warning';
        }
      });
    },
    error: (err) => {
      this.isCancelling = false;
      this.showCancelConfirm = false;

      if (err.status === 401) {
        this.message = 'Please login to cancel your ticket';
        this.messageType = 'warning';

        this.router.navigate(['/login'], {
          queryParams: { redirect: 'track-booking' },
        });
      } else if (err.status === 400) {
        this.message = err.error;
        this.messageType = 'warning';
      } else {
        this.message = 'Cancellation failed. Please try again.';
        this.messageType = 'error';
      }
    },
  });
}


  private resetState() {
    this.booking = null;
    this.message = '';
    this.messageType = '';
    this.showCancelConfirm = false;
  }
}
