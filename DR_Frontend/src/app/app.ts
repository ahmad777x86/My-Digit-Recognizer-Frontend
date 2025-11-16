import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  host: { 'ngSkipHydration': 'true' },
  styleUrl: './app.css'
})
export class App {
  protected title = 'DR_Frontend';
  image: File | null = null;

  private isDrawing = false;
  private ctx: CanvasRenderingContext2D | null = null;

  startDrawing(event: MouseEvent, canvas: HTMLCanvasElement) {
    console.log('🎯 Start drawing at:', event.offsetX, event.offsetY);

    this.ctx = canvas.getContext('2d');
    if (!this.ctx) {
      console.error('No canvas context available');
      return;
    }

    // Set drawing style
    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = 15;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    this.isDrawing = true;

    // Start new path at mouse position
    this.ctx.beginPath();
    this.ctx.moveTo(event.offsetX, event.offsetY);

    // Draw a dot at start position
    this.ctx.lineTo(event.offsetX, event.offsetY);
    this.ctx.stroke();
  }

  draw(event: MouseEvent, canvas: HTMLCanvasElement) {
    if (!this.isDrawing || !this.ctx) return;

    // Continue drawing to current mouse position
    this.ctx.lineTo(event.offsetX, event.offsetY);
    this.ctx.stroke();

    console.log('📝 Drawing to:', event.offsetX, event.offsetY);
  }

  stopDrawing() {
    this.isDrawing = false;
    console.log('🛑 Stopped drawing');
  }

  clearCanvas(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear with white background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    console.log('🧹 Canvas cleared');
  }

  predictDigit(canvas: HTMLCanvasElement) {
    const imageData = canvas.toDataURL('image/png');
    console.log('🔮 Image data:', imageData.substring(0, 50) + '...');
    // Send to your API
  }

}
