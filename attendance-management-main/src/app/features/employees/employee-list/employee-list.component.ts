import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Employee } from '../../../core/models/interfaces';
import { EmployeeService } from '../../../core/services/employee.service';
import { EmployeeFilterPipe } from '../../../shared/pipes/employee-filter.pipe';
import { EmployeeFormDialogComponent } from '../../../dialogs/employee-form-dialog/employee-form-dialog.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    EmployeeFilterPipe
  ],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  displayedColumns: string[] = ['id', 'name', 'department', 'role', 'actions'];

  searchText: string = '';
  selectedDepartment: string = '';
  departments: string[] = ['Engineering', 'HR', 'Marketing', 'Sales', 'Product'];

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.applyFilter();
      },
      error: () => this.snackBar.open('Error loading employees', 'Close', { duration: 3000 })
    });
  }

  applyFilter(): void {
    const pipe = new EmployeeFilterPipe();
    this.filteredEmployees = pipe.transform(this.employees, this.searchText, this.selectedDepartment);
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(EmployeeFormDialogComponent, {
      width: '500px',
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.addEmployee(result).subscribe({
          next: () => {
            this.loadEmployees();
            this.snackBar.open('Employee added successfully', 'Close', { duration: 3000 });
          },
          error: () => this.snackBar.open('Error adding employee', 'Close', { duration: 3000 })
        });
      }
    });
  }

  openEditDialog(employee: Employee): void {
    const dialogRef = this.dialog.open(EmployeeFormDialogComponent, {
      width: '500px',
      data: { isEdit: true, employee }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.updateEmployee(employee.id, result).subscribe({
          next: () => {
            this.loadEmployees();
            this.snackBar.open('Employee updated successfully', 'Close', { duration: 3000 });
          },
          error: () => this.snackBar.open('Error updating employee', 'Close', { duration: 3000 })
        });
      }
    });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/employees', id]);
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.loadEmployees();
          this.snackBar.open('Employee deleted successfully', 'Close', { duration: 3000 });
        },
        error: () => this.snackBar.open('Error deleting employee', 'Close', { duration: 3000 })
      });
    }
  }
}
