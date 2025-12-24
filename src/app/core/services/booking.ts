import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl = 'http://localhost:8765/bookings';

  constructor(private http: HttpClient) {}

  createBooking(payload: any) {
    return this.http.post(`${this.baseUrl}/create`, payload);
  }


getBookingByPnr(pnr: string) {
  return this.http.get(`${this.baseUrl}/pnr/${pnr}`);
}

cancelBookingByPnr(pnr: string) {
  return this.http.put(`${this.baseUrl}/cancel/pnr/${pnr}`, {});
}

 getMyBookings() {
    return this.http.get<any[]>(`${this.baseUrl}/history`);
  }

}