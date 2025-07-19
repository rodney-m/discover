import { Component, Input, forwardRef, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';
import { CommonModule } from '@angular/common';

const inputVariants = cva(
  'min-w-0 flex-auto rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6',
  {
    variants: {
      size: {
        sm: 'px-2.5 py-1.5 text-sm',
        md: 'px-3.5 py-2 text-base',
        lg: 'px-4 py-2.5 text-lg'
      },
      variant: {
        default: 'outline-gray-300 focus:outline-primary',
        error: 'outline-red-300 focus:outline-red-600',
        success: 'outline-green-300 focus:outline-green-600'
      }
    },
    defaultVariants: {
      size: 'md',
      variant: 'default'
    }
  }
);

type InputVariants = VariantProps<typeof inputVariants>;

@Component({
  selector: 'discover-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() isRequired = false;
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' = 'text';
  @Input() id?: string;
  @Input() name?: string;
  @Input() autocomplete?: string;
  @Input() errorMessage?: string;
  @Input() size: InputVariants['size'] = 'md';
  @Input() variant: InputVariants['variant'] = 'default';
  @Input() disabled = false;

  value = '';
  touched = false;

  get inputClasses(): string {
    return inputVariants({ size: this.size, variant: this.variant });
  }

  // ControlValueAccessor implementation
  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  onBlur(): void {
    if (!this.touched) {
      this.touched = true;
      this.onTouched();
    }
  }

  onFocus(): void {
    // Handle focus if needed
  }
} 