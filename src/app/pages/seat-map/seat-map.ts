import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightService } from '../../core/services/Flight';

@Component({
  selector: 'app-seat-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seat-map.html',
  styleUrls: ['./seat-map.css']
})
export class SeatMap implements OnInit {

  @Input() flightId!: string;
  @Input() passengerCount = 1;

  @Output() seatsChange = new EventEmitter<string[]>();

  seats: { seatNumber: string; booked: boolean }[] = [];
  selectedSeats: string[] = [];

  loading = true;
  error = '';

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    if (!this.flightId) return;

    this.flightService.getSeatMap(this.flightId).subscribe({
     next: (res: { seatNumber: string; booked: boolean }[]) => {
  this.seats = res;
  this.loading = false;
}
,
      error: () => {
        this.error = 'Failed to load seat map';
        this.loading = false;
      }
    });
  }

  toggleSeat(seat: any) {
    if (seat.booked) return;

    const index = this.selectedSeats.indexOf(seat.seatNumber);

    // Deselect
    if (index >= 0) {
      this.selectedSeats.splice(index, 1);
    }
    // Select
    else {
      if (this.selectedSeats.length >= this.passengerCount) {
        return;
      }
      this.selectedSeats.push(seat.seatNumber);
    }

    this.seatsChange.emit([...this.selectedSeats]);
  }

  isSelected(seatNumber: string): boolean {
    return this.selectedSeats.includes(seatNumber);
  }
}
