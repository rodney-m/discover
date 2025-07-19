import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { PasswordInputComponent } from './password-input.component';

describe('PasswordInputComponent', () => {
  let component: PasswordInputComponent;
  let fixture: ComponentFixture<PasswordInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordInputComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have password type by default', () => {
    const input = fixture.nativeElement.querySelector('input');
    expect(input.type).toBe('password');
  });

  it('should toggle password visibility when button is clicked', () => {
    const button = fixture.nativeElement.querySelector('button');
    const input = fixture.nativeElement.querySelector('input');
    
    // Initially password should be hidden
    expect(input.type).toBe('password');
    expect(component.showPassword).toBe(false);
    
    // Click the toggle button
    button.click();
    fixture.detectChanges();
    
    // Password should now be visible
    expect(input.type).toBe('text');
    expect(component.showPassword).toBe(true);
    
    // Click again to hide
    button.click();
    fixture.detectChanges();
    
    // Password should be hidden again
    expect(input.type).toBe('password');
    expect(component.showPassword).toBe(false);
  });

  it('should display label when provided', () => {
    component.label = 'Password';
    fixture.detectChanges();
    
    const label = fixture.nativeElement.querySelector('label');
    expect(label.textContent).toContain('Password');
  });

  it('should show required asterisk when isRequired is true', () => {
    component.label = 'Password';
    component.isRequired = true;
    fixture.detectChanges();
    
    const asterisk = fixture.nativeElement.querySelector('.text-red-500');
    expect(asterisk.textContent).toBe('*');
  });

  it('should display error message when provided', () => {
    component.errorMessage = 'Password is required';
    fixture.detectChanges();
    
    const errorDiv = fixture.nativeElement.querySelector('.text-red-600');
    expect(errorDiv.textContent).toContain('Password is required');
  });

  it('should apply correct size classes', () => {
    component.size = 'sm';
    fixture.detectChanges();
    
    const input = fixture.nativeElement.querySelector('input');
    expect(input.className).toContain('px-2.5 py-1.5 text-sm');
  });

  it('should apply correct variant classes', () => {
    component.variant = 'error';
    fixture.detectChanges();
    
    const input = fixture.nativeElement.querySelector('input');
    expect(input.className).toContain('outline-red-300');
  });

  it('should be disabled when disabled is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    
    const input = fixture.nativeElement.querySelector('input');
    const button = fixture.nativeElement.querySelector('button');
    
    expect(input.disabled).toBe(true);
    expect(button.disabled).toBe(true);
  });

  it('should work with reactive forms', () => {
    const formControl = new FormControl('test-password');
    component.writeValue('test-password');
    fixture.detectChanges();
    
    const input = fixture.nativeElement.querySelector('input');
    expect(input.value).toBe('test-password');
    
    // Simulate user input
    input.value = 'new-password';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    expect(component.value).toBe('new-password');
  });

  it('should call onTouched when input loses focus', () => {
    const onTouchedSpy = jest.fn();
    component.registerOnTouched(onTouchedSpy);
    
    const input = fixture.nativeElement.querySelector('input');
    input.dispatchEvent(new Event('blur'));
    
    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should show eye icon when password is hidden', () => {
    component.showPassword = false;
    fixture.detectChanges();
    
    const eyeIcon = fixture.nativeElement.querySelector('svg');
    expect(eyeIcon).toBeTruthy();
    // Check for the eye icon path (circle element)
    const circle = eyeIcon.querySelector('circle');
    expect(circle).toBeTruthy();
  });

  it('should show eye-off icon when password is visible', () => {
    component.showPassword = true;
    fixture.detectChanges();
    
    const eyeOffIcon = fixture.nativeElement.querySelector('svg');
    expect(eyeOffIcon).toBeTruthy();
    // Check for the eye-off icon path (line element)
    const line = eyeOffIcon.querySelector('line');
    expect(line).toBeTruthy();
  });

  it('should have proper accessibility attributes', () => {
    component.id = 'password-field';
    component.label = 'Password';
    fixture.detectChanges();
    
    const input = fixture.nativeElement.querySelector('input');
    const label = fixture.nativeElement.querySelector('label');
    const button = fixture.nativeElement.querySelector('button');
    
    expect(input.id).toBe('password-field');
    expect(label.getAttribute('for')).toBe('password-field');
    expect(button.getAttribute('type')).toBe('button');
  });
}); 