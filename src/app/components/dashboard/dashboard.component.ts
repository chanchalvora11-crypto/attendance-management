import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatChipsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalEmployees: number = 0;
  presentCount: number = 0;
  absentCount: number = 0;
  pendingLeaves: number = 0;
  presentPercentage: number = 0;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getEmployees().subscribe(employees => {
      this.totalEmployees = employees.length;
      this.updateAttendanceSummary();
    });

    this.dataService.getAttendance().subscribe(() => {
      this.updateAttendanceSummary();
    });

    this.dataService.getLeaveRequests().subscribe(() => {
      this.pendingLeaves = this.dataService.getPendingLeaveRequests();
    });
  }

  private updateAttendanceSummary(): void {
    const summary = this.dataService.getAttendanceSummary();
    this.presentCount = summary.present;
    this.absentCount = summary.absent;
    this.presentPercentage =
      this.totalEmployees > 0 ? Math.round((this.presentCount / this.totalEmployees) * 100) : 0;
  }

  getTodayDate(): string {
    return this.dataService.getTodayDateString();
  }
}
