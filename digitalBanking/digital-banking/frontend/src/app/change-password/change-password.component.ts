import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(4)]], // Assuming minLength from backend or general practice
      confirmNewPassword: ['', Validators.required]
    }, { validator: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmNewPassword = form.get('confirmNewPassword')?.value;
    return newPassword === confirmNewPassword ? null : { mismatch: true };
  }

  handleChangePassword() {
    this.errorMessage = null;
    this.successMessage = null;
    if (this.changePasswordForm.valid) {
      const oldPassword = this.changePasswordForm.value.oldPassword;
      const newPassword = this.changePasswordForm.value.newPassword;

      this.authService.changePassword(oldPassword, newPassword).subscribe({
        next: (response: any) => {
          this.successMessage = "Password changed successfully."; // Or use response message if backend sends one
          this.changePasswordForm.reset();
          // Optionally navigate away or show success for a few seconds
          // setTimeout(() => this.router.navigate(['/admin/profile']), 2000); // Example navigation
        },
        error: (err) => {
          this.errorMessage = err.error?.message || err.error || 'Failed to change password. Please check your old password.';
          console.error(err);
        }
      });
    }
  }
} 