import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Employee } from '../../core/models/interfaces';

@Component({
  selector: 'app-employee-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './employee-form-dialog.component.html',
  styles: [`
    .full-width { width: 100%; margin-bottom: 15px; }
    form { display: flex; flex-direction: column; }
    .form-row { display: flex; gap: 15px; }
    .form-row > * { flex: 1; }
  `]
})
export class EmployeeFormDialogComponent implements OnInit {
  isEdit = false;
  departments = ['Engineering', 'HR', 'Marketing', 'Sales', 'Product'];
  roles = ['EMPLOYEE', 'HR', 'ADMIN'];

  employee: Omit<Employee, 'id'> = {
    name: '',
    email: '',
    phone: '',
    department: '',
    role: 'EMPLOYEE',
    joinDate: new Date().toISOString().split('T')[0]
  };

  constructor(
    public dialogRef: MatDialogRef<EmployeeFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isEdit: boolean; employee?: Employee }
  ) { }

  ngOnInit(): void {
    this.isEdit = this.data.isEdit;
    if (this.isEdit && this.data.employee) {
      this.employee = { ...this.data.employee };
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.employee);
  }
}