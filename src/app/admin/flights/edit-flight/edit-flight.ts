import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminFlightService } from '../../services/admin-flight';

@Component({
  selector: 'app-edit-flight',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-flight.html',
  styleUrl: './edit-flight.css'
})
export class EditFlight implements OnInit {

  flightForm!: FormGroup;
  flightId!: string;

  message = '';
  messageType: 'success' | 'error' | '' = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private flightService: AdminFlightService
  ) {}

  ngOnInit(): void {
    this.flightId = this.route.snapshot.paramMap.get('id')!;

    this.flightForm = this.fb.group({
      flightNumber: ['', Validators.required],
      airline: ['', Validators.required],
      source: ['', Validators.required],
      destination: ['', Validators.required],
      date: ['', Validators.required],
      availableSeats: ['', [Validators.required, Validators.min(1)]]
    });

    this.flightService.getFlightById(this.flightId).subscribe({
      next: (data) => this.flightForm.patchValue(data),
      error: () => {
        this.message = 'Failed to load flight details';
        this.messageType = 'error';
      }
    });
  }

  submit() {
    if (this.flightForm.invalid) return;

    this.flightService
      .updateFlight(this.flightId, this.flightForm.value)
      .subscribe({
        next: () => {
          this.message = 'Flight updated successfully';
          this.messageType = 'success';
          setTimeout(() => this.router.navigate(['/admin/flights']), 800);
        },
        error: () => {
          this.message = 'Update failed';
          this.messageType = 'error';
        }
      });
  }
}
