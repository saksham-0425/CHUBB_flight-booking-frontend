import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private baseUrl = 'http://localhost:8765/flights';

  constructor(private http: HttpClient) {}

 
  getSeatMap(flightId: string): Observable<
    { seatNumber: string; booked: boolean }[]
  > {
    return this.http.get<
      { seatNumber: string; booked: boolean }[]
    >(`${this.baseUrl}/${flightId}/seats`);
  }
}
