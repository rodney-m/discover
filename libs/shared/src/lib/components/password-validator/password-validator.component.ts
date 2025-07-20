import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, CheckCircle, XCircle } from 'lucide-angular';

export interface PasswordCriteria {
  label: string;
  test: (password: string) => boolean;
  icon: string;
}

@Component({
  selector: 'discover-password-validator',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './password-validator.component.html',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class PasswordValidatorComponent implements OnChanges {
  @Input() password: string = '';
  
  // Lucide icons
  readonly CheckCircle = CheckCircle;
  readonly XCircle = XCircle;
  
  criteria: PasswordCriteria[] = [
    {
      label: '8 characters',
      test: (password: string) => password.length >= 8,
      icon: 'check'
    },
    {
      label: '1 lowercase',
      test: (password: string) => /[a-z]/.test(password),
      icon: 'check'
    },
    {
      label: '1 uppercase',
      test: (password: string) => /[A-Z]/.test(password),
      icon: 'check'
    },
    {
      label: '1 number',
      test: (password: string) => /\d/.test(password),
      icon: 'check'
    }
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['password']) {
      // Trigger change detection for validation updates
    }
  }

  isCriteriaMet(criteria: PasswordCriteria): boolean {
    return criteria.test(this.password);
  }

  getValidationIcon(criteria: PasswordCriteria): any {
    return this.isCriteriaMet(criteria) ? this.CheckCircle : this.XCircle;
  }

  getValidationColor(criteria: PasswordCriteria): string {
    return this.isCriteriaMet(criteria) ? 'text-green-500' : 'text-gray-400';
  }

  getValidationTextColor(criteria: PasswordCriteria): string {
    return this.isCriteriaMet(criteria) ? 'text-green-700' : 'text-gray-600';
  }
} 