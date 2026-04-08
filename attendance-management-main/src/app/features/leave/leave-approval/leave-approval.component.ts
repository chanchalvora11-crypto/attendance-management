import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { LeaveRequest, Employee } from '../../../core/models/interfaces';
import { LeaveService } from '../../../core/services/leave.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { AuthService } from '../../../core/services/auth.service';
import { HighlightStatusDirective } from '../../../shared/directives/highlight-status.directive';
import { LeaveApprovalDialogComponent } from '../../../dialogs/leave-approval-dialog/leave-approval-dialog.component';

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
    MatBadgeModule,
    MatDialogModule,
    MatSnackBarModule,
    HighlightStatusDirective
  ],
  templateUrl: './leave-approval.component.html',
  styles: [`
    .approval-container { padding: 20px; }
    .header-card { margin-bottom: 20px; }
    table { width: 100%; }
    .status-badge { font-weight: 500; font-size: 11px; text-transform: uppercase; }
  `]
})
export class LeaveApprovalComponent implements OnInit {
  leaveRequests: LeaveRequest[] = [];
  employees: Map<number, Employee> = new Map();
  displayedColumns: string[] = ['appliedOn', 'employee', 'dates', 'type', 'reason', 'status', 'actions'];
  pendingCount: number = 0;

  constructor(
    private leaveService: LeaveService,
    private employeeService: EmployeeService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    forkJoin({
      requests: this.leaveService.getLeaveRequests(),
      employees: this.employeeService.getEmployees()
    }).subscribe({
      next: ({ requests, employees }) => {
        this.leaveRequests = requests.reverse();
        this.pendingCount = requests.filter(r => r.status === 'PENDING').length;
        employees.forEach(e => this.employees.set(e.id, e));
      },
      error: () => this.snackBar.open('Error loading approval data', 'Close', { duration: 3000 })
    });
  }

  getEmployee(id: number): Employee | undefined {
    return this.employees.get(id);
  }

  openActionDialog(request: LeaveRequest, action: 'APPROVE' | 'REJECT'): void {
    const dialogRef = this.dialog.open(LeaveApprovalDialogComponent, {
      width: '400px',
      data: { action }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const reviewer = this.authService.getCurrentUser()?.name || 'HR';
        const status = action === 'APPROVE' ? 'APPROVED' : 'REJECTED';

        this.leaveService.updateLeaveStatus(request.id, status, reviewer, result.comment).subscribe({
          next: () => {
            this.loadData();
            this.snackBar.open(`Request ${status.toLowerCase()} successfully`, 'Close', { duration: 3000 });
          },
          error: () => this.snackBar.open('Error updating request', 'Close', { duration: 3000 })
        });
      }
    });
  }
}
