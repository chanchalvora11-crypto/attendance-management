import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Employee } from '../../../employee.model';

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
    MatButtonModule
  ],
  templateUrl: './employee-form-dialog.component.html',
  styleUrls: ['./employee-form-dialog.component.css']
})
export class EmployeeFormDialogComponent implements OnInit {
  isEdit = false;
  departments = ['IT', 'HR', 'Finance', 'Sales', 'Operations'];
  roles = ['Employee', 'HR'];

  name = '';
  department = '';
  role: 'Employee' | 'HR' = 'Employee';

  constructor(
    public dialogRef: MatDialogRef<EmployeeFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isEdit: boolean; employee?: Employee }
  ) {}

  ngOnInit(): void {
    this.isEdit = this.data.isEdit;
    this.name = this.data.employee?.name || '';
    this.department = this.data.employee?.department || '';
    this.role = this.data.employee?.role || 'Employee';
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (!this.name.trim() || !this.department.trim()) {
      return;
    }

    this.dialogRef.close({
      name: this.name.trim(),
      department: this.department.trim(),
      role: this.role
    });
  }
}
