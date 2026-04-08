import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule
  ],
  template: `
    <mat-nav-list>
      <a mat-list-item routerLink="/dashboard" routerLinkActive="active-link">
        <mat-icon matListItemIcon>dashboard</mat-icon>
        <span matListItemTitle>Dashboard</span>
      </a>
      
      <a mat-list-item routerLink="/employees" routerLinkActive="active-link">
        <mat-icon matListItemIcon>people</mat-icon>
        <span matListItemTitle>Employees</span>
      </a>
      
      <a mat-list-item routerLink="/attendance" routerLinkActive="active-link">
  <mat-icon matListItemIcon>event_available</mat-icon>
  <span matListItemTitle>Attendance</span>
</a>
    
      <a mat-list-item routerLink="/leave/request" routerLinkActive="active-link">
        <mat-icon matListItemIcon>event_busy</mat-icon>
        <span matListItemTitle>Leave Request</span>
      </a>
      
      <a mat-list-item *ngIf="authService.hasRole(['HR', 'ADMIN'])" routerLink="/leave/approval" routerLinkActive="active-link">
        <mat-icon matListItemIcon>fact_check</mat-icon>
        <span matListItemTitle>Leave Approval</span>
      </a>
    </mat-nav-list>
  `,
  styles: [`
    .active-link { background-color: rgba(63, 81, 181, 0.1); color: #3f51b5; border-right: 4px solid #3f51b5; }
    mat-icon { margin-right: 12px; }
  `]
})
export class SidebarComponent {
  constructor(public authService: AuthService) { }
}
