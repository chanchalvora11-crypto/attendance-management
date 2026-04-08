import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AttendanceRecord } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'http://localhost:3000/attendanceRecords';

  constructor(private http: HttpClient) {}

  getAttendanceByDate(date: string): Observable<AttendanceRecord[]> {
    return this.http.get<AttendanceRecord[]>(`${this.apiUrl}?date=${date}`);
  }

  getEmployeeAttendance(employeeId: number): Observable<AttendanceRecord[]> {
    return this.http.get<AttendanceRecord[]>(`${this.apiUrl}?employeeId=${employeeId}`);
  }

  markAttendance(record: AttendanceRecord): Observable<AttendanceRecord> {
    return this.http.post<AttendanceRecord>(this.apiUrl, record);
  }

  updateAttendance(record: AttendanceRecord): Observable<AttendanceRecord> {
    return this.http.put<AttendanceRecord>(`${this.apiUrl}/${record.id}`, record);
  }
}