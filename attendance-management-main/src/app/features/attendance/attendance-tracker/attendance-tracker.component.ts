import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Employee, AttendanceRecord } from '../../../core/models/interfaces';
import { EmployeeService } from '../../../core/services/employee.service';
import { AttendanceService } from '../../../core/services/attendance.service';

@Component({
  selector: 'app-attendance-tracker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './attendance-tracker.component.html',
  styleUrls: ['./attendance-tracker.component.css']
})
export class AttendanceTrackerComponent implements OnInit {
  employees: Employee[] = [];
  selectedDate: Date = new Date();
  displayedColumns: string[] = ['name', 'department', 'status', 'action'];
  attendanceMap = new Map<number, AttendanceRecord>();
  statusOptions: ('PRESENT' | 'ABSENT' | 'WFH' | 'LEAVE')[] = [
    'PRESENT',
    'ABSENT',
    'WFH',
    'LEAVE'
  ];

  loading = false;
  errorMessage = '';

  constructor(
    private employeeService: EmployeeService,
    private attendanceService: AttendanceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  get formattedDate(): string {
    const d = this.selectedDate instanceof Date ? this.selectedDate : new Date(this.selectedDate);
    return d.toISOString().split('T')[0];
  }

  loadData(): void {
    this.loading = true;
    this.errorMessage = '';

    forkJoin({
      employees: this.employeeService.getEmployees(),
      records: this.attendanceService.getAttendanceByDate(this.formattedDate)
    }).subscribe({
      next: ({ employees, records }) => {
        this.employees = employees ?? [];
        this.attendanceMap.clear();

        (records ?? []).forEach((record) => {
          this.attendanceMap.set(record.employeeId, record);
        });

        this.loading = false;
      },
      error: (err) => {
        console.error('Attendance load error:', err);
        this.errorMessage = 'Failed to load attendance data.';
        this.loading = false;
        this.snackBar.open('Failed to load attendance data', 'Close', {
          duration: 3000
        });
      }
    });
  }

  onDateChange(): void {
    this.loadData();
  }

  getRecord(employeeId: number): AttendanceRecord | undefined {
    return this.attendanceMap.get(employeeId);
  }

  updateStatus(employeeId: number, status: 'PRESENT' | 'ABSENT' | 'WFH' | 'LEAVE'): void {
    const existing = this.getRecord(employeeId);

    if (existing) {
      const updated: AttendanceRecord = {
        ...existing,
        status
      };

      this.attendanceService.updateAttendance(updated).subscribe({
        next: () => {
          this.attendanceMap.set(employeeId, updated);
          this.snackBar.open('Attendance updated', 'Close', { duration: 2000 });
        },
        error: (err) => {
          console.error('Attendance update error:', err);
          this.snackBar.open('Failed to update attendance', 'Close', {
            duration: 3000
          });
        }
      });
    } else {
      const newRecord: AttendanceRecord = {
        id: Date.now(),
        employeeId,
        date: this.formattedDate,
        status,
        remarks: ''
      };

      this.attendanceService.markAttendance(newRecord).subscribe({
        next: (saved) => {
          this.attendanceMap.set(employeeId, saved);
          this.snackBar.open('Attendance marked', 'Close', { duration: 2000 });
        },
        error: (err) => {
          console.error('Attendance create error:', err);
          this.snackBar.open('Failed to mark attendance', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }
}