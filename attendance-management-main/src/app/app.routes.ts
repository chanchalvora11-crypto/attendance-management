import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AttendanceTrackerComponent } from './features/attendance/attendance-tracker/attendance-tracker.component';
import { EmployeeListComponent } from './features/employees/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './features/employees/employee-detail/employee-detail.component';
import { LeaveRequestComponent } from './features/leave/leave-request/leave-request.component';
import { LeaveApprovalComponent } from './features/leave/leave-approval/leave-approval.component';
import { roleGuard } from './shared/guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/:id', component: EmployeeDetailComponent },
  { path: 'attendance', component: AttendanceTrackerComponent },
  { path: 'leave/request', component: LeaveRequestComponent },
  {
    path: 'leave/approval',
    component: LeaveApprovalComponent,
    canActivate: [roleGuard]
  },
  { path: '**', redirectTo: 'dashboard' }
];