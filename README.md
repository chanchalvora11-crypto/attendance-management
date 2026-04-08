# 🚀 Employee Attendance and Leave Management System

A fully functional web-based Employee Attendance and Leave Management System built using Angular. This project focuses on providing a structured and scalable solution to manage employee attendance records, leave workflows, and administrative approvals through a modern UI.

---

## 📌 Overview

This project was developed as part of coursework (CIA 3) and enhanced through multiple iterations involving debugging, UI improvements, and feature extensions.

The application simulates a real-world system where organizations can:
- track attendance
- manage employee data
- process leave requests
- monitor overall activity via a dashboard

---

## ✨ Core Features

### 🧩 Functional Modules
- Employee Management (Add / View / Manage employees)
- Attendance Tracker (Mark & monitor attendance)
- Leave Request System (Submit leave requests)
- Leave Approval Workflow (Approve / Reject requests)
- Dashboard Overview (Summary of activities)

---

### ⚙️ Technical Features
- Angular Routing with Guards
- Reactive Forms with Validation
- Modular Component Architecture
- Angular Material UI Integration
- REST-based mock backend using JSON Server
- Real-time UI updates via Angular change detection

---

## 🛠️ Tech Stack

| Technology        | Role                         |
|------------------|------------------------------|
| Angular          | Frontend Framework           |
| TypeScript       | Application Logic            |
| HTML / SCSS      | UI & Styling                 |
| Angular Material | UI Components                |
| JSON Server      | Mock Backend API             |

---

## ⚙️ Setup & Installation
### 1. Clone the repository


2. Install dependencies
Bash
npm install

3. Run Angular app
Bash
ng serve

4. Start mock backend
Bash
npx json-server --watch db.json --port 3000

5. Open in browser
http://localhost:4200

🔧 Key Implementation Details

🔹 Routing Configuration
TypeScript
const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'attendance', component: AttendanceTrackerComponent },
  { path: 'leave-request', component: LeaveRequestComponent },
  { path: 'leave-approval', component: LeaveApprovalComponent }
];

🔹 Example Service (API Handling)
TypeScript

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private baseUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}

  getEmployees() {
    return this.http.get(this.baseUrl);
  }

  addEmployee(employee: any) {
    return this.http.post(this.baseUrl, employee);
  }
}
🔹 Angular Material Usage
HTML
<mat-form-field appearance="outline">
  <mat-label>Employee Name</mat-label>
  <input matInput [(ngModel)]="employee.name" required>
</mat-form-field>


📁 Project Structure

src/
 ├── app/
 │   ├── components/
 │   ├── services/
 │   ├── models/
 │   ├── guards/
 │   └── app.module.ts
 ├── assets/
 ├── environments/
 └── styles/


⚡ Development Insights
This project involved solving several real-world Angular issues:
Fixing router-outlet not rendering components
Handling Zone.js configuration errors (NG0908)
Debugging template binding errors
Managing dependency conflicts in Angular versions
Ensuring proper module imports for Angular Material

🧪 Testing
Bash
ng test
ng test --code-coverage
🚧 Challenges Faced
Angular configuration conflicts during setup

Routing issues causing blank pages

Dependency mismatches (Angular + Zone.js)

Handling form validation edge cases

Debugging UI rendering issues

🔮 Future Improvements
Authentication & Login system

Role-based access (Admin / Employee)

Backend integration (Node.js / Firebase)

Advanced analytics dashboard

Improved UI/UX responsiveness

👩‍💻 Author
Chanchal Vora
B.Tech IT Student
Frontend Developer | Problem Solver

⭐ Final Note
This project reflects hands-on experience with Angular development, debugging, and building structured frontend applications.

```bash
git clone https://github.com/chanchalvora11-crypto/attendance-management.git
cd attendance-management
