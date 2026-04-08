import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-leave-approval-dialog',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    template: `
    <h2 mat-dialog-title>{{ data.action }} Leave Request</h2>
    <mat-dialog-content>
      <form [formGroup]="approvalForm">
        <p>Are you sure you want to <strong>{{ data.action | lowercase }}</strong> this request?</p>
        <mat-form-field appearance="outline" style="width: 100%;">
          <mat-label>Review Comment</mat-label>
          <textarea matInput formControlName="comment" placeholder="Enter your feedback..." rows="3"></textarea>
          <mat-error *ngIf="approvalForm.get('comment')?.invalid && approvalForm.get('comment')?.touched">
            Comment is required
          </mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button [color]="data.action === 'APPROVE' ? 'primary' : 'warn'" 
              (click)="onSubmit()" [disabled]="approvalForm.invalid">
        Confirm {{ data.action }}
      </button>
    </mat-dialog-actions>
  `
})
export class LeaveApprovalDialogComponent implements OnInit {
    approvalForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<LeaveApprovalDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { action: 'APPROVE' | 'REJECT' }
    ) {
        this.approvalForm = this.fb.group({
            comment: ['', Validators.required]
        });
    }

    ngOnInit(): void { }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSubmit(): void {
        if (this.approvalForm.valid) {
            this.dialogRef.close(this.approvalForm.value);
        }
    }
}
