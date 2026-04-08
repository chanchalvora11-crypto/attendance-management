import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../../employee.model';
import { AttendanceRecord } from '../../attendance.model';
import { LeaveRequest } from '../../leave.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private mockEmployees: Employee[] = [
    { id: 1, name: 'Alice Johnson', department: 'IT', role: 'Employee' },
    { id: 2, name: 'Bob Smith', department: 'HR', role: 'HR' },
    { id: 3, name: 'Charlie Brown', department: 'Finance', role: 'Employee' },
    { id: 4, name: 'Diana Prince', department: 'IT', role: 'Employee' },
    { id: 5, name: 'Eve Wilson', department: 'Sales', role: 'Employee' }
  ];

  private mockAttendance: AttendanceRecord[] = [
    { employeeId: 1, date: this.getTodayDate(), status: 'Present' },
    { employeeId: 2, date: this.getTodayDate(), status: 'Present' },
    { employeeId: 3, date: this.getTodayDate(), status: 'Absent' },
    { employeeId: 4, date: this.getTodayDate(), status: 'Present' },
    { employeeId: 5, date: this.getTodayDate(), status: 'Absent' }
  ];

  private mockLeaveRequests: LeaveRequest[] = [
    {
      id: 1,
      employeeId: 1,
      fromDate: '2026-02-01',
      toDate: '2026-02-05',
      reason: 'Annual vacation',
      status: 'Pending'
    },
    {
      id: 2,
      employeeId: 3,
      fromDate: '2026-01-25',
      toDate: '2026-01-26',
      reason: 'Medical appointment',
      status: 'Approved'
    },
    {
      id: 3,
      employeeId: 5,
      fromDate: '2026-02-10',
      toDate: '2026-02-12',
      reason: 'Personal leave',
      status: 'Pending'
    }
  ];

  private employeesSubject = new BehaviorSubject<Employee[]>(this.mockEmployees);
  private attendanceSubject = new BehaviorSubject<AttendanceRecord[]>(this.mockAttendance);
  private leaveRequestsSubject = new BehaviorSubject<LeaveRequest[]>(this.mockLeaveRequests);

  employees$ = this.employeesSubject.asObservable();
  attendance$ = this.attendanceSubject.asObservable();
  leaveRequests$ = this.leaveRequestsSubject.asObservable();

  constructor() {
    // Initialize with original data
    this.resetData();
  }

  private getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  private resetData(): void {
    // Reset to mock data on service initialization
    this.mockEmployees = [
      { id: 1, name: 'Alice Johnson', department: 'IT', role: 'Employee' },
      { id: 2, name: 'Bob Smith', department: 'HR', role: 'HR' },
      { id: 3, name: 'Charlie Brown', department: 'Finance', role: 'Employee' },
      { id: 4, name: 'Diana Prince', department: 'IT', role: 'Employee' },
      { id: 5, name: 'Eve Wilson', department: 'Sales', role: 'Employee' }
    ];

    this.mockAttendance = [
      { employeeId: 1, date: this.getTodayDate(), status: 'Present' },
      { employeeId: 2, date: this.getTodayDate(), status: 'Present' },
      { employeeId: 3, date: this.getTodayDate(), status: 'Absent' },
      { employeeId: 4, date: this.getTodayDate(), status: 'Present' },
      { employeeId: 5, date: this.getTodayDate(), status: 'Absent' }
    ];

    this.mockLeaveRequests = [
      {
        id: 1,
        employeeId: 1,
        fromDate: '2026-02-01',
        toDate: '2026-02-05',
        reason: 'Annual vacation',
        status: 'Pending'
      },
      {
        id: 2,
        employeeId: 3,
        fromDate: '2026-01-25',
        toDate: '2026-01-26',
        reason: 'Medical appointment',
        status: 'Approved'
      },
      {
        id: 3,
        employeeId: 5,
        fromDate: '2026-02-10',
        toDate: '2026-02-12',
        reason: 'Personal leave',
        status: 'Pending'
      }
    ];

    this.employeesSubject.next([...this.mockEmployees]);
    this.attendanceSubject.next([...this.mockAttendance]);
    this.leaveRequestsSubject.next([...this.mockLeaveRequests]);
  }

  // Employee methods
  getEmployees(): Observable<Employee[]> {
    return this.employees$;
  }

  addEmployee(employee: Omit<Employee, 'id'>): void {
    const maxId = Math.max(...this.mockEmployees.map(e => e.id), 0);
    const newEmployee: Employee = { ...employee, id: maxId + 1 };
    this.mockEmployees.push(newEmployee);
    this.employeesSubject.next([...this.mockEmployees]);
  }

  updateEmployee(id: number, employee: Partial<Employee>): void {
    const index = this.mockEmployees.findIndex(e => e.id === id);
    if (index !== -1) {
      this.mockEmployees[index] = { ...this.mockEmployees[index], ...employee };
      this.employeesSubject.next([...this.mockEmployees]);
    }
  }

  deleteEmployee(id: number): void {
    this.mockEmployees = this.mockEmployees.filter(e => e.id !== id);
    this.mockAttendance = this.mockAttendance.filter(a => a.employeeId !== id);
    this.mockLeaveRequests = this.mockLeaveRequests.filter(lr => lr.employeeId !== id);
    this.employeesSubject.next([...this.mockEmployees]);
    this.attendanceSubject.next([...this.mockAttendance]);
    this.leaveRequestsSubject.next([...this.mockLeaveRequests]);
  }

  // Attendance methods
  getAttendance(): Observable<AttendanceRecord[]> {
    return this.attendance$;
  }

  toggleAttendance(employeeId: number): void {
    const record = this.mockAttendance.find(
      a => a.employeeId === employeeId && a.date === this.getTodayDate()
    );
    if (record) {
      record.status = record.status === 'Present' ? 'Absent' : 'Present';
    } else {
      this.mockAttendance.push({
        employeeId,
        date: this.getTodayDate(),
        status: 'Present'
      });
    }
    this.attendanceSubject.next([...this.mockAttendance]);
  }

  markAttendance(employeeId: number, status: 'Present' | 'Absent'): void {
    const record = this.mockAttendance.find(
      a => a.employeeId === employeeId && a.date === this.getTodayDate()
    );
    if (record) {
      record.status = status;
    } else {
      this.mockAttendance.push({
        employeeId,
        date: this.getTodayDate(),
        status
      });
    }
    this.attendanceSubject.next([...this.mockAttendance]);
  }

  // Leave request methods
  getLeaveRequests(): Observable<LeaveRequest[]> {
    return this.leaveRequests$;
  }

  addLeaveRequest(request: Omit<LeaveRequest, 'id'>): void {
    const maxId = Math.max(...this.mockLeaveRequests.map(lr => lr.id), 0);
    const newRequest: LeaveRequest = { ...request, id: maxId + 1 };
    this.mockLeaveRequests.push(newRequest);
    this.leaveRequestsSubject.next([...this.mockLeaveRequests]);
  }

  updateLeaveRequestStatus(id: number, status: 'Pending' | 'Approved' | 'Rejected'): void {
    const request = this.mockLeaveRequests.find(lr => lr.id === id);
    if (request) {
      request.status = status;
      this.leaveRequestsSubject.next([...this.mockLeaveRequests]);
    }
  }

  getAttendanceSummary(): { present: number; absent: number; total: number } {
    const todayAttendance = this.mockAttendance.filter(a => a.date === this.getTodayDate());
    const present = todayAttendance.filter(a => a.status === 'Present').length;
    const absent = todayAttendance.filter(a => a.status === 'Absent').length;
    return { present, absent, total: this.mockEmployees.length };
  }

  getPendingLeaveRequests(): number {
    return this.mockLeaveRequests.filter(lr => lr.status === 'Pending').length;
  }

  getTodayDateString(): string {
    return this.getTodayDate();
  }
}
