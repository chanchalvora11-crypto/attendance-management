export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: 'EMPLOYEE' | 'HR' | 'ADMIN';
  joinDate: string;
}

export interface AttendanceRecord {
  id: number;
  employeeId: number;
  date: string; // yyyy-mm-dd
  status: 'PRESENT' | 'ABSENT' | 'WFH' | 'LEAVE';
  remarks?: string;
}

export interface LeaveRequest {
  id: number;
  employeeId: number;
  fromDate: string;
  toDate: string;
  type: 'SICK' | 'CASUAL' | 'PAID' | 'UNPAID';
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  appliedOn: string;
  reviewedBy?: string;
  reviewComment?: string;
}
