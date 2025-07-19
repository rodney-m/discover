import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have text type by default', () => {
    const input = fixture.nativeElement.querySelector('input');
    expect(input.type).toBe('text');
  });

  it('should display label when provided', () => {
    component.label = 'Email';
    fixture.detectChanges();
    
    const label = fixture.nativeElement.querySelector('label');
    expect(label.textContent).toContain('Email');
  });

  it('should show required asterisk when isRequired is true', () => {
    component.label = 'Email';
    component.isRequired = true;
    fixture.detectChanges();
    
    const asterisk = fixture.nativeElement.querySelector('.text-red-500');
    expect(asterisk.textContent).toBe('*');
  });

  it('should display error message when provided', () => {
    component.errorMessage = 'Email is required';
    fixture.detectChanges();
    
    const errorDiv = fixture.nativeElement.querySelector('.text-red-600');
    expect(errorDiv.textContent).toContain('Email is required');
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
    expect(input.disabled).toBe(true);
  });

  it('should work with reactive forms', () => {
    const formControl = new FormControl('test-value');
    component.writeValue('test-value');
    fixture.detectChanges();
    
    const input = fixture.nativeElement.querySelector('input');
    expect(input.value).toBe('test-value');
    
    // Simulate user input
    input.value = 'new-value';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    expect(component.value).toBe('new-value');
  });

  it('should call onTouched when input loses focus', () => {
    const onTouchedSpy = jest.fn();
    component.registerOnTouched(onTouchedSpy);
    
    const input = fixture.nativeElement.querySelector('input');
    input.dispatchEvent(new Event('blur'));
    
    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should have proper accessibility attributes', () => {
    component.id = 'email-field';
    component.label = 'Email';
    fixture.detectChanges();
    
    const input = fixture.nativeElement.querySelector('input');
    const label = fixture.nativeElement.querySelector('label');
    
    expect(input.id).toBe('email-field');
    expect(label.getAttribute('for')).toBe('email-field');
  });

  it('should support different input types', () => {
    component.type = 'email';
    fixture.detectChanges();
    
    const input = fixture.nativeElement.querySelector('input');
    expect(input.type).toBe('email');
  });

  it('should apply placeholder when provided', () => {
    component.placeholder = 'Enter your email';
    fixture.detectChanges();
    
    const input = fixture.nativeElement.querySelector('input');
    expect(input.placeholder).toBe('Enter your email');
  });
}); 