# Attendance & Leave Management System

## Project Objective
This project upgrades an Angular application to a fully functional Employee Attendance and Leave Management System using Angular 17+ best practices, modular architecture, and Material UI, meeting the CIA-3 requirements.

## Tech Stack
- Frontend: Angular 17 (Standalone Components)
- UI Library: Angular Material
- State/HTTP: RxJS, HttpClient
- Backend: JSON Server (Mock REST API)

## Folder Structure
```text
src/app/
├── core/
│   ├── layout/       # Navbar and Sidebar with MatSidenav
│   ├── models/       # TypeScript Interfaces (Employee, AttendanceRecord, LeaveRequest)
│   └── services/     # API integration (EmployeeService, AttendanceService, LeaveService, AuthService)
├── dialogs/          # Reusable Material Dialogs (EmployeeForm, LeaveApproval)
├── features/         # Feature Modules (Standalone folders)
│   ├── attendance/   # Attendance Tracker component
│   ├── dashboard/    # Dashboard with metrics
│   ├── employees/    # Employee List & Detail (Route params used)
│   └── leave/        # Leave Request (Employee) & Leave Approval (HR/Admin)
└── shared/
    ├── directives/   # Custom HighlightStatusDirective
    ├── guards/       # Custom RoleGuard
    └── pipes/        # Custom EmployeeFilterPipe
```

## Features Summary
1. **Dashboard**: Metrics cards (Total employees, present status, pending leaves) and progress bars.
2. **Employees Module**: List employees with search/filter, Add/Edit via Template-driven Forms with validatons, view details with ID routing.
3. **Attendance Module**: Mark daily attendance per employee using dropdowns, highlight status.
4. **Leave Module**: Employee leave request via Reactive Forms with date/text validation, and HR approval view restricted by auth guard.

## Steps to Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the Mock Backend Server:
   ```bash
   npm run server
   ```
3. Start the Angular application:
   ```bash
   ng serve
   ```
   *(Alternatively, run `npm run start:all` to run both simultaneously if supported).*

## API Endpoints Used (http://localhost:3000)
- `GET, POST, PATCH, DELETE /employees`
- `GET, POST, PATCH /attendanceRecords`
- `GET, POST, PATCH /leaveRequests`

## Screenshots Placeholders
- `screenshots/dashboard.png` - Shows metrics and charts
- `screenshots/employee-list.png` - Material Table with filter and pagination
- `screenshots/attendance-tracker.png` - Date picker and status selection
- `screenshots/leave-request.png` - Reactive form with validations
- `screenshots/leave-approval.png` - HR view for managing requests

## Future Enhancements
- Real backend integration with JWT authentication.
- Advanced charts for historical attendance tracking.
- Role-based multi-step leave approvals.
- Export to Excel/PDF functionality.

---
## Final Checklist (CIA-3)
- [x] Angular 17+ structure (Standalone components)
- [x] Feature modules / standalone folders constructed
- [x] Layout shell with responsive MatSidenav
- [x] TypeScript Models built
- [x] Mock Backend integrated (`db.json` and `json-server`)
- [x] Routing & Navigation structured with route params (`/employees/:id`)
- [x] Guards and basic auth (`roleGuard`)
- [x] Services with CRUD logic, `HttpClient`, and `RxJS`
- [x] All required Angular components built and complete
- [x] **Template forms** (Employee Dialog) & **Reactive forms** (Leave Dialog/Request) combined with validations
- [x] Custom Pipe (`employeeFilter`) & Custom Directive (`highlightStatus`)
- [x] Angular Material consistently applied
- [x] Output properly tested and this documentation provided
