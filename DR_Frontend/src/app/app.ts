import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  host: { 'ngSkipHydration': 'true' },
  styleUrl: './app.css'
})
export class App {
  Response: string | null = null;
  Confidence: string | null = null;
  protected title = 'DR_Frontend';
  image: File | null = null;
  private preds: Object | null = null;
  private isDrawing = false;
  private ctx: CanvasRenderingContext2D | null = null;

  constructor(private http: HttpClient, private ngZone: NgZone) { }

  StartDrawing(event: MouseEvent, canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d');

    if (!this.ctx) return;

    this.ctx.strokeStyle = '#FFFFFF';
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 15;

    this.isDrawing = true;

    this.ctx.beginPath();
    this.ctx.moveTo(event.offsetX, event.offsetY);

    this.ctx.lineTo(event.offsetX, event.offsetY);
    this.ctx.stroke();
  }

  Draw(event: MouseEvent, canvas: HTMLCanvasElement) {
    if (!this.isDrawing || !this.ctx)
      return;

    this.ctx.lineTo(event.offsetX, event.offsetY);
    this.ctx.stroke();
  }

  StopDrawing() {
    this.isDrawing = false;
  }

  ClearCanvas(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d');

    if (!this.ctx) return;

    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  Predict(canvas: HTMLCanvasElement) {
    // Convert canvas to blob
    canvas.toBlob((blob) => {
      if (!blob) return;

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', blob, 'image.png');

      // Send POST request
      this.http.post('http://localhost:8000/predict', formData)
        .subscribe({
          next: (response: any) => {
            this.ngZone.run(() => {
              this.Response = JSON.stringify(response).substring(15, 16)
              this.Confidence = JSON.stringify(response).substring(32, 34)
            });
            console.log('Response: ', response);
            console.log('Prediction:', this.Response);
            console.log('Confidence:', this.Confidence, "%");
          },
          error: (error) => {
            console.error('Upload failed:', error);
          }
        });
    }, 'image/png');

  }
}
