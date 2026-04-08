import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../services/auth.service';
import { Employee } from '../models/interfaces';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  template: `
    <mat-toolbar color="primary" class="navbar">
      <button mat-icon-button (click)="toggleSidenav.emit()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>Attendance Management System</span>
      <span class="spacer"></span>
      
      <mat-form-field appearance="outline" class="user-switcher">
        <mat-select [value]="currentUser?.id" (selectionChange)="onUserChange($event.value)" placeholder="Switch User">
          <mat-option *ngFor="let user of mockUsers" [value]="user.id">
            {{user.name}} ({{user.role}})
          </mat-option>
        </mat-select>
      </mat-form-field>

      <button mat-icon-button (click)="onLogout()">
        <mat-icon>logout</mat-icon>
      </button>
    </mat-toolbar>
  `,
  styles: [`
    .spacer { flex: 1 1 auto; }
    .user-switcher { font-size: 14px; width: 200px; margin-top: 15px; margin-right: 15px; }
    ::ng-deep .user-switcher .mat-mdc-text-field-wrapper { background-color: rgba(255,255,255,0.1); color: white; }
    ::ng-deep .user-switcher .mat-mdc-select-value { color: white; }
    ::ng-deep .user-switcher .mat-mdc-select-arrow { color: white; }
  `]
})
export class NavbarComponent {
  @Input() currentUser: Partial<Employee> | null = null;
  @Output() toggleSidenav = new EventEmitter<void>();

  mockUsers: Partial<Employee>[] = [
    { id: 1, name: 'Arjun (Employee)', role: 'EMPLOYEE' },
    { id: 2, name: 'Priya (HR)', role: 'HR' },
    { id: 3, name: 'Vikram (Admin)', role: 'ADMIN' }
  ];

  constructor(private authService: AuthService) { }

  onUserChange(userId: number): void {
    const user = this.mockUsers.find(u => u.id === userId);
    if (user) {
      this.authService.login(user);
    }
  }

  onLogout(): void {
    this.authService.logout();
  }
}
