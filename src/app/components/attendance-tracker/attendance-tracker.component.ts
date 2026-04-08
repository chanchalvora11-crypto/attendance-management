import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { Employee } from '../../../employee.model';
import { AttendanceRecord } from '../../../attendance.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-attendance-tracker',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatBadgeModule
  ],
  templateUrl: './attendance-tracker.component.html',
  styleUrls: ['./attendance-tracker.component.css']
})
export class AttendanceTrackerComponent implements OnInit {
  employees: Employee[] = [];
  todayDate: string = '';
  displayedColumns: string[] = ['name', 'department', 'status', 'action'];
  attendance: Map<number, AttendanceRecord> = new Map();

  constructor(private dataService: DataService) {
    this.todayDate = this.dataService.getTodayDateString();
  }

  ngOnInit(): void {
    this.dataService.getEmployees().subscribe(employees => {
      this.employees = employees;
    });

    this.dataService.getAttendance().subscribe(records => {
      this.attendance.clear();
      records.forEach(record => {
        if (record.date === this.todayDate) {
          this.attendance.set(record.employeeId, record);
        }
      });
    });
  }

  getAttendanceStatus(employeeId: number): 'Present' | 'Absent' {
    return this.attendance.get(employeeId)?.status || 'Absent';
  }

  toggleAttendance(employeeId: number): void {
    this.dataService.toggleAttendance(employeeId);
  }

  markPresent(employeeId: number): void {
    this.dataService.markAttendance(employeeId, 'Present');
  }

  markAbsent(employeeId: number): void {
    this.dataService.markAttendance(employeeId, 'Absent');
  }

  getStatusColor(status: string): string {
    return status === 'Present' ? 'accent' : 'warn';
  }
}
