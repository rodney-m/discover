import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent, ToastData } from './toast.component';
import { ToastService } from '../../services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'discover-toast-container',
  standalone: true,
  imports: [CommonModule, ToastComponent],
  templateUrl: './toast-container.component.html',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ToastContainerComponent implements OnInit, OnDestroy {
  toasts: ToastData[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.toastService.toasts$.subscribe(toasts => {
        this.toasts = toasts;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClose(toastId: string): void {
    this.toastService.removeToast(toastId);
  }

  trackByToastId(index: number, toast: ToastData): string {
    return toast.id;
  }
} 