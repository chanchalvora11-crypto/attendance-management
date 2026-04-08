import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeaveRequest } from '../models/interfaces';

@Injectable({
    providedIn: 'root'
})
export class LeaveService {
    private apiUrl = 'http://localhost:3000/leaveRequests';

    constructor(private http: HttpClient) { }

    getLeaveRequests(): Observable<LeaveRequest[]> {
        return this.http.get<LeaveRequest[]>(this.apiUrl);
    }

    getLeaveRequestsByEmployee(employeeId: number): Observable<LeaveRequest[]> {
        return this.http.get<LeaveRequest[]>(`${this.apiUrl}?employeeId=${employeeId}`);
    }

    applyLeave(request: Omit<LeaveRequest, 'id'>): Observable<LeaveRequest> {
        return this.http.post<LeaveRequest>(this.apiUrl, request);
    }

    updateLeaveStatus(id: number, status: 'APPROVED' | 'REJECTED', reviewedBy: string, reviewComment: string): Observable<LeaveRequest> {
        return this.http.patch<LeaveRequest>(`${this.apiUrl}/${id}`, {
            status,
            reviewedBy,
            reviewComment
        });
    }
}
