import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { LeaveRequest } from '../../../leave.model';
import { Employee } from '../../../employee.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-leave-request',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent implements OnInit {
  employees: Employee[] = [];
  leaveRequests: LeaveRequest[] = [];
  displayedColumns: string[] = ['employeeId', 'employeeName', 'fromDate', 'toDate', 'reason', 'status'];
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getEmployees().subscribe(employees => {
      this.employees = employees;
    });

    this.dataService.getLeaveRequests().subscribe(requests => {
      this.leaveRequests = requests;
    });
  }

  getEmployeeName(employeeId: number): string {
    return this.employees.find(e => e.id === employeeId)?.name || 'Unknown';
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Approved':
        return 'accent';
      case 'Rejected':
        return 'warn';
      default:
        return '';
    }
  }
}
