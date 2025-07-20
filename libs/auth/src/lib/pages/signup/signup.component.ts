import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { InputComponent, PasswordInputComponent, ButtonComponent, CheckboxComponent, ToggleComponent, ToggleOption, PasswordValidatorComponent, ToastService } from '@discover/shared';
import { AccountType, SignupRequest } from '../../models/auth.types';
import { AuthService } from '../../services/auth.service';
import { LucideAngularModule, AlertCircle, CheckCircle } from 'lucide-angular';

@Component({
  selector: 'discover-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    InputComponent,
    PasswordInputComponent,
    ButtonComponent,
    CheckboxComponent,
    ToggleComponent,
    PasswordValidatorComponent,
    LucideAngularModule
  ],
  templateUrl: './signup.component.html',
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading = false;
  AccountType = AccountType;

  // Lucide icons
  readonly AlertCircle = AlertCircle;
  readonly CheckCircle = CheckCircle;

  accountTypeOptions: ToggleOption[] = [
    {
      value: AccountType.INDIVIDUAL,
      label: 'Individual',
      icon: 'user'
    },
    {
      value: AccountType.COMPANY,
      label: 'Company',
      icon: 'building'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {
    this.signupForm = this.fb.group({
      accountType: [AccountType.INDIVIDUAL, [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      agreeToTerms: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    
    return null;
  }

  get passwordValue(): string {
    return this.signupForm.get('password')?.value || '';
  }

  get confirmPasswordValue(): string {
    return this.signupForm.get('confirmPassword')?.value || '';
  }

  get passwordsMatch(): boolean {
    return this.passwordValue === this.confirmPasswordValue && this.confirmPasswordValue !== '';
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.isLoading = true;
      
      const signupRequest: SignupRequest = {
        accountType: this.signupForm.value.accountType,
        username: this.signupForm.value.username,
        firstName: this.signupForm.value.firstName,
        lastName: this.signupForm.value.lastName,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
      };
      
      this.authService.register(signupRequest).subscribe({
        next: (response: string) => {
          console.log('Registration successful:', response);
          this.isLoading = false;
          this.toastService.showSuccess('Account Created!', 'Your account has been successfully created. Please sign in.');
          // Navigate to login page after successful registration
          this.router.navigate(['/auth/login']);
        },
        error: (error: Error) => {
          console.error('Registration failed:', error);
          this.isLoading = false;
          this.toastService.showError('Registration Failed', error.message || 'An error occurred during registration. Please try again.');
        }
      });
    }
  }
} 