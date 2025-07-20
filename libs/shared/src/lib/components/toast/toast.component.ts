import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, CheckCircle, XCircle, X } from 'lucide-angular';

export interface ToastData {
  id: string;
  type: 'success' | 'error';
  title: string;
  message?: string;
  duration?: number;
}

@Component({
  selector: 'discover-toast',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './toast.component.html',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ToastComponent {
  @Input() toast!: ToastData;
  @Output() close = new EventEmitter<string>();

  // Lucide icons
  readonly CheckCircle = CheckCircle;
  readonly XCircle = XCircle;
  readonly X = X;

  get iconClass(): string {
    return this.toast.type === 'success' 
      ? 'size-6 text-green-400' 
      : 'size-6 text-red-400';
  }

  get icon(): any {
    return this.toast.type === 'success' ? this.CheckCircle : this.XCircle;
  }

  onClose(): void {
    this.close.emit(this.toast.id);
  }
} 