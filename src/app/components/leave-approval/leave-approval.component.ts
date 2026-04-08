import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { LeaveRequest } from '../../../leave.model';
import { Employee } from '../../../employee.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-leave-approval',
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
  templateUrl: './leave-approval.component.html',
  styleUrls: ['./leave-approval.component.css']
})
export class LeaveApprovalComponent implements OnInit {
  leaveRequests: LeaveRequest[] = [];
  employees: Employee[] = [];
  displayedColumns: string[] = ['id', 'employeeName', 'fromDate', 'toDate', 'reason', 'status', 'actions'];
  pendingCount: number = 0;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getEmployees().subscribe(employees => {
      this.employees = employees;
    });

    this.dataService.getLeaveRequests().subscribe(requests => {
      this.leaveRequests = requests;
      this.pendingCount = requests.filter(r => r.status === 'Pending').length;
    });
  }

  getEmployeeName(employeeId: number): string {
    return this.employees.find(e => e.id === employeeId)?.name || 'Unknown';
  }

  approveRequest(id: number): void {
    this.dataService.updateLeaveRequestStatus(id, 'Approved');
  }

  rejectRequest(id: number): void {
    this.dataService.updateLeaveRequestStatus(id, 'Rejected');
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

  isPending(status: string): boolean {
    return status === 'Pending';
  }
}
