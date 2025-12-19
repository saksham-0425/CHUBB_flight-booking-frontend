import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../core/services/booking';

@Component({
  selector: 'app-track-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './track-booking.html',
  styleUrls: ['./track-booking.css']
})
export class TrackBooking {

  pnr = '';

  booking: any = null;

  isLoading = false;

  message = '';
  messageType: 'success' | 'error' | 'warning' | 'info' | '' = '';

  constructor(private bookingService: BookingService) {}

  searchBooking() {
  if (this.isLoading) return;

  const pnrValue = this.pnr.trim().toUpperCase();

  this.message = '';
  this.messageType = '';
  this.booking = null;

  if (!pnrValue) {
    this.message = 'Please enter a PNR';
    this.messageType = 'warning';
    return;
  }

  this.isLoading = true;

  this.bookingService.getBookingByPnr(pnrValue).subscribe({
    next: (res) => {
      this.booking = res;
      this.message = '';
      this.messageType = '';
      this.isLoading = false;
    },
    error: () => {
      this.isLoading = false;
      this.message = 'No booking found for this PNR';
      this.messageType = 'error';
    }
  });
}



}
