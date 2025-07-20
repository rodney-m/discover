import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'discover-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './auth-layout.component.html',
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .image-container {
      position: relative;
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      overflow: hidden;
    }

    .image-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: 
        radial-gradient(circle at 25% 25%, rgba(255,255,255,0.05) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%);
      z-index: 1;
    }

    .background-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
      z-index: 2;
    }

    .background-image.loaded {
      opacity: 1;
    }

    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        135deg,
        rgba(0, 0, 0, 0.3) 0%,
        rgba(0, 0, 0, 0.2) 100%
      );
      z-index: 3;
    }
  `]
})
export class AuthLayoutComponent implements OnInit, OnDestroy {
  private images: string[] = [
    '/images/auth-layout-image-1.jpg',
    '/images/auth-layout-image-2.jpg',
    '/images/auth-layout-image-3.jpg'
  ];
  
  selectedImage: string = '';
  imageLoaded: boolean = false;
  private preloadedImages: HTMLImageElement[] = [];

  ngOnInit() {
    this.selectRandomImage();
    this.preloadImages();
  }

  ngOnDestroy() {
    // Clean up preloaded images
    this.preloadedImages = [];
  }

  private selectRandomImage() {
    const randomIndex = Math.floor(Math.random() * this.images.length);
    this.selectedImage = this.images[randomIndex];
  }

  private preloadImages() {
    this.images.forEach((imageSrc, index) => {
      const img = new Image();
      img.onload = () => {
        if (imageSrc === this.selectedImage) {
          this.imageLoaded = true;
        }
      };
      img.src = imageSrc;
      this.preloadedImages.push(img);
    });
  }

  onImageLoad() {
    this.imageLoaded = true;
  }
} 