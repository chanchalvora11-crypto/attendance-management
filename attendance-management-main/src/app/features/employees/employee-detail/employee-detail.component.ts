import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { forkJoin } from 'rxjs';
import { Employee, AttendanceRecord, LeaveRequest } from '../../../core/models/interfaces';
import { EmployeeService } from '../../../core/services/employee.service';
import { AttendanceService } from '../../../core/services/attendance.service';
import { LeaveService } from '../../../core/services/leave.service';
import { HighlightStatusDirective } from '../../../shared/directives/highlight-status.directive';

@Component({
    selector: 'app-employee-detail',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatChipsModule,
        MatTabsModule,
        HighlightStatusDirective
    ],
    templateUrl: './employee-detail.component.html',
    styles: [`
    .detail-container { padding: 20px; }
    .header { display: flex; align-items: center; margin-bottom: 20px; }
    .header h1 { margin: 0 0 0 15px; }
    .info-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; margin-top: 15px; }
    .info-item label { display: block; color: #666; font-size: 12px; margin-bottom: 4px; }
    .info-item span { font-weight: 500; font-size: 16px; }
    .history-tabs { margin-top: 30px; }
    table { width: 100%; }
    .status-chip { font-weight: 500; text-transform: uppercase; font-size: 11px; }
  `]
})
export class EmployeeDetailComponent implements OnInit {
    employee: Employee | null = null;
    attendanceHistory: AttendanceRecord[] = [];
    leaveHistory: LeaveRequest[] = [];

    attendanceColumns: string[] = ['date', 'status', 'remarks'];
    leaveColumns: string[] = ['appliedOn', 'fromDate', 'toDate', 'type', 'status'];

    constructor(
        private route: ActivatedRoute,
        private employeeService: EmployeeService,
        private attendanceService: AttendanceService,
        private leaveService: LeaveService
    ) { }

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        if (id) {
            this.loadData(id);
        }
    }

    loadData(id: number): void {
        forkJoin({
            employee: this.employeeService.getEmployeeById(id),
            attendance: this.attendanceService.getEmployeeAttendance(id),
            leaves: this.leaveService.getLeaveRequestsByEmployee(id)
        }).subscribe({
            next: ({ employee, attendance, leaves }) => {
                this.employee = employee;
                this.attendanceHistory = attendance.reverse(); // Newest first
                this.leaveHistory = leaves.reverse();
            },
            error: (err) => console.error('Error loading employee detail', err)
        });
    }
}
