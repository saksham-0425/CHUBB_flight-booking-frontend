import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminFlightService {

  private baseUrl = 'http://localhost:8765/flights';

  constructor(private http: HttpClient) {}

  getAllFlights() {
    return this.http.get<any[]>(`${this.baseUrl}/admin/all`);
  }

  getFlightById(id: string) {
    return this.http.get<any>(`${this.baseUrl}/admin/${id}`);
  }

addFlight(payload: any) {
  return this.http.post(
    `${this.baseUrl}/add`,
    payload,
    { responseType: 'text' }
  );
}
  updateFlight(id: string, payload: any) {
    return this.http.put(`${this.baseUrl}/admin/${id}`, payload);
  }

  deleteFlight(id: string) {
    return this.http.delete(`${this.baseUrl}/admin/${id}`);
  }
}
