import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { EmployeeService } from '../../core/services/employee.service';
import { AttendanceService } from '../../core/services/attendance.service';
import { LeaveService } from '../../core/services/leave.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalEmployees = 0;
  presentCount = 0;
  absentCount = 0;
  pendingLeaves = 0;

  constructor(
    private employeeService: EmployeeService,
    private attendanceService: AttendanceService,
    private leaveService: LeaveService
  ) {}

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];

    forkJoin({
      employees: this.employeeService.getEmployees(),
      attendance: this.attendanceService.getAttendanceByDate(today),
      leaves: this.leaveService.getLeaveRequests()
    }).subscribe({
      next: ({ employees, attendance, leaves }) => {
        this.totalEmployees = (employees || []).length;
        this.presentCount = (attendance || []).filter(
          (r) => r.status === 'PRESENT'
        ).length;
        this.absentCount = (attendance || []).filter(
          (r) => r.status === 'ABSENT'
        ).length;
        this.pendingLeaves = (leaves || []).filter(
          (l) => l.status === 'PENDING'
        ).length;
      },
      error: (err) => {
        console.error('Dashboard load error', err);
      }
    });
  }
}