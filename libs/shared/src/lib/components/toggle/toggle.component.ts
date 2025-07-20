import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, User, Building, Home, Briefcase, Heart, Star } from 'lucide-angular';

export interface ToggleOption {
  value: string;
  label: string;
  icon?: string;
}

@Component({
  selector: 'discover-toggle',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './toggle.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true
    }
  ]
})
export class ToggleComponent implements ControlValueAccessor {
  @Input() options: ToggleOption[] = [];
  @Input() label?: string;

  // Lucide icons
  readonly User = User;
  readonly Building = Building;
  readonly Home = Home;
  readonly Briefcase = Briefcase;
  readonly Heart = Heart;
  readonly Star = Star;

  value: string = '';

  // ControlValueAccessor implementation
  onChange = (value: string) => {};
  onTouched = () => {};

  selectOption(value: string): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Handle disabled state if needed
  }

  getIconForOption(iconName: string): any {
    switch (iconName) {
      case 'user': return this.User;
      case 'building': return this.Building;
      case 'home': return this.Home;
      case 'briefcase': return this.Briefcase;
      case 'heart': return this.Heart;
      case 'star': return this.Star;
      default: return null;
    }
  }

  getSliderPosition(): string {
    if (this.options.length === 0) return '2px';
    
    const selectedIndex = this.options.findIndex(option => option.value === this.value);
    if (selectedIndex === -1) return '2px';
    
    const optionWidth = 100 / this.options.length;
    const leftPosition = (selectedIndex * optionWidth) + '%';
    return `calc(${leftPosition} + 2px)`;
  }

  getSliderWidth(): string {
    if (this.options.length === 0) return 'calc(50% - 2px)';
    const optionWidth = 100 / this.options.length;
    return `calc(${optionWidth}% - 2px)`;
  }
} 