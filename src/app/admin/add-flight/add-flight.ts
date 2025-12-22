import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { AdminFlightService } from '../services/admin-flight';

@Component({
  selector: 'app-add-flight',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-flight.html',
  styleUrl: './add-flight.css'
})
export class AddFlight {

  flightForm: FormGroup;

  message = '';
  messageType: 'success' | 'error' | 'warning' | '' = '';
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private flightService: AdminFlightService
  ) {
    this.flightForm = this.fb.group({
      flightNumber: ['', [Validators.required, Validators.pattern(/^[A-Z0-9-]+$/)]],
      airline: ['', Validators.required],
      source: ['', [Validators.required, Validators.minLength(3)]],
      destination: ['', [Validators.required, Validators.minLength(3)]],
      date: ['', Validators.required],
      availableSeats: ['', [Validators.required, Validators.min(1)]]
    });
  }

  get f() {
    return this.flightForm.controls;
  }

  submit() {
    if (this.flightForm.invalid) {
      this.message = 'Please correct the highlighted errors';
      this.messageType = 'warning';
      return;
    }

    this.submitting = true;
    this.message = '';
    this.messageType = '';

    this.flightService.addFlight(this.flightForm.value).subscribe({
      next: () => {
        this.message = 'Flight added successfully';
        this.messageType = 'success';
        this.flightForm.reset();
        this.submitting = false;
      },
      error: () => {
        this.message = 'Failed to add flight';
        this.messageType = 'error';
        this.submitting = false;
      }
    });
  }
}
