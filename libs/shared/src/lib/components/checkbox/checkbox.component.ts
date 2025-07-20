import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Check } from 'lucide-angular';

@Component({
  selector: 'discover-checkbox',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './checkbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() id?: string;
  @Input() label?: string;
  @Input() disabled = false;

  // Lucide icons
  readonly Check = Check;

  checked = false;

  // ControlValueAccessor implementation
  onValueChange = (value: boolean) => {};
  onTouched = () => {};

  writeValue(value: boolean): void {
    this.checked = value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onValueChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.onValueChange(this.checked);
    this.onTouched();
  }

  toggleCheckbox(): void {
    this.checked = !this.checked;
    this.onValueChange(this.checked);
    this.onTouched();
  }
} 