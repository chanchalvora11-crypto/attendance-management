import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { LeaveService } from '../../../core/services/leave.service';
import { AuthService } from '../../../core/services/auth.service';
import { LeaveRequest } from '../../../core/models/interfaces';
import { HighlightStatusDirective } from '../../../shared/directives/highlight-status.directive';

@Component({
  selector: 'app-leave-request',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatIconModule,
    HighlightStatusDirective
  ],
  templateUrl: './leave-request.component.html',
  styles: [`
    .leave-container { padding: 20px; }
    .form-card { margin-bottom: 30px; }
    .full-width { width: 100%; margin-bottom: 15px; }
    .date-row { display: flex; gap: 15px; }
    .date-row > * { flex: 1; }
    table { width: 100%; }
    .status-badge { font-weight: 500; font-size: 11px; text-transform: uppercase; }
  `]
})
export class LeaveRequestComponent implements OnInit {
  leaveForm: FormGroup;
  myRequests: LeaveRequest[] = [];
  displayedColumns: string[] = ['appliedOn', 'fromDate', 'toDate', 'type', 'reason', 'status'];

  leaveTypes = ['SICK', 'CASUAL', 'PAID', 'UNPAID'];

  constructor(
    private fb: FormBuilder,
    private leaveService: LeaveService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.leaveForm = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      type: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.loadMyRequests();
  }

  loadMyRequests(): void {
    const user = this.authService.getCurrentUser();
    if (user && user.id) {
      this.leaveService.getLeaveRequestsByEmployee(user.id).subscribe({
        next: (data) => this.myRequests = data.reverse(),
        error: () => this.snackBar.open('Error loading requests', 'Close', { duration: 3000 })
      });
    }
  }

  onSubmit(): void {
    if (this.leaveForm.invalid) return;

    const user = this.authService.getCurrentUser();
    if (!user || !user.id) {
      this.snackBar.open('Please login first', 'Close', { duration: 3000 });
      return;
    }

    const request: Omit<LeaveRequest, 'id'> = {
      employeeId: user.id,
      fromDate: this.leaveForm.value.fromDate.toISOString().split('T')[0],
      toDate: this.leaveForm.value.toDate.toISOString().split('T')[0],
      type: this.leaveForm.value.type,
      reason: this.leaveForm.value.reason,
      status: 'PENDING',
      appliedOn: new Date().toISOString().split('T')[0]
    };

    this.leaveService.applyLeave(request).subscribe({
      next: () => {
        this.snackBar.open('Leave application submitted', 'Close', { duration: 3000 });
        this.leaveForm.reset();
        this.loadMyRequests();
      },
      error: () => this.snackBar.open('Error submitting request', 'Close', { duration: 3000 })
    });
  }
}
