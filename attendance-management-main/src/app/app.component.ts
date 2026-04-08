import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavbarComponent } from './core/layout/navbar.component';
import { SidebarComponent } from './core/layout/sidebar.component';
import { AuthService } from './core/services/auth.service';
import { Employee } from './core/models/interfaces';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    NavbarComponent,
    SidebarComponent
  ],
  template: `
    <app-navbar [currentUser]="currentUser" (toggleSidenav)="sidenav.toggle()"></app-navbar>
    
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav [opened]="sidenavOpen" mode="side" class="sidenav" [fixedInViewport]="true" [fixedTopGap]="64">
        <app-sidebar></app-sidebar>
      </mat-sidenav>
      
      <mat-sidenav-content class="content">
        <div class="main-container">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container { height: calc(100vh - 64px); }
    .sidenav { width: 240px; background: #fafafa; border-right: 1px solid #eee; }
    .content { padding: 20px; background: #f5f5f5; }
    .main-container { max-width: 1200px; margin: 0 auto; }
  `]
})
export class AppComponent implements OnInit {
  sidenavOpen = true;
  currentUser: Partial<Employee> | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }
}
