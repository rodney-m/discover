import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastData } from '../components/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<ToastData[]>([]);
  public toasts$: Observable<ToastData[]> = this.toastsSubject.asObservable();

  private defaultDuration = 5000; // 5 seconds

  /**
   * Show a success toast notification
   * @param title - The title of the toast
   * @param message - Optional message for the toast
   * @param duration - Optional duration in milliseconds (default: 5000ms)
   */
  showSuccess(title: string, message?: string, duration?: number): void {
    this.showToast({
      id: this.generateId(),
      type: 'success',
      title,
      message,
      duration: duration || this.defaultDuration
    });
  }

  /**
   * Show an error toast notification
   * @param title - The title of the toast
   * @param message - Optional message for the toast
   * @param duration - Optional duration in milliseconds (default: 5000ms)
   */
  showError(title: string, message?: string, duration?: number): void {
    this.showToast({
      id: this.generateId(),
      type: 'error',
      title,
      message,
      duration: duration || this.defaultDuration
    });
  }

  /**
   * Remove a specific toast by ID
   * @param toastId - The ID of the toast to remove
   */
  removeToast(toastId: string): void {
    const currentToasts = this.toastsSubject.value;
    const updatedToasts = currentToasts.filter(toast => toast.id !== toastId);
    this.toastsSubject.next(updatedToasts);
  }

  /**
   * Clear all toasts
   */
  clearAll(): void {
    this.toastsSubject.next([]);
  }

  /**
   * Show a toast notification
   * @param toastData - The toast data to display
   */
  private showToast(toastData: ToastData): void {
    const currentToasts = this.toastsSubject.value;
    const updatedToasts = [...currentToasts, toastData];
    this.toastsSubject.next(updatedToasts);

    // Auto-remove toast after duration
    if (toastData.duration && toastData.duration > 0) {
      setTimeout(() => {
        this.removeToast(toastData.id);
      }, toastData.duration);
    }
  }

  /**
   * Generate a unique ID for toast
   * @returns A unique string ID
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
} 