import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { InputComponent, PasswordInputComponent, ButtonComponent, CheckboxComponent, ToggleComponent, ToggleOption, PasswordValidatorComponent } from '@discover/shared';
import { AccountType, SignupRequest } from '../../models/auth.types';
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
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      accountType: ['', [Validators.required]],
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
        ...this.signupForm.value
      };
      
      // Simulate API call
      setTimeout(() => {
        console.log('Signup request:', signupRequest);
        this.isLoading = false;
        
        // Navigate to login or dashboard
        this.router.navigate(['/auth/login']);
      }, 2000);
    }
  }
} 