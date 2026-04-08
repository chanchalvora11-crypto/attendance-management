export interface AttendanceRecord {
  employeeId: number;
  date: string;
  status: 'Present' | 'Absent';
}
