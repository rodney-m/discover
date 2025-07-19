import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'discover-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="flex min-h-screen">
      <!-- Content Area (Left) -->
      <div class="flex-1 flex items-center justify-center p-8">
        <div class="w-full max-w-md">
          <router-outlet></router-outlet>
        </div>
      </div>
      
      <!-- Image Area (Right) -->
      <div class="flex-1 bg-primary hidden lg:block rounded-l-3xl">
        <!-- Placeholder for image -->
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `]
})
export class AuthLayoutComponent {} 