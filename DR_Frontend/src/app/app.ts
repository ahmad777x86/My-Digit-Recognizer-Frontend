import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Api } from './services/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  host: { 'ngSkipHydration': 'true' },
  styleUrl: './app.css'
})
export class App {
  protected title = 'DR_Frontend';
  image: File | null = null;
  private preds: Object | null = null;
  private isDrawing = false;
  private ctx: CanvasRenderingContext2D | null = null;

  constructor(private api: Api) { }

  StartDrawing(event: MouseEvent, canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d');

    if (!this.ctx) return;

    this.ctx.strokeStyle = '#000000';
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

    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  Predict(canvas: HTMLCanvasElement) {
    console.log("Sending Image");
    const imagedata = canvas.toDataURL('image/png');
    this.api.PostImage(imagedata).subscribe(preds => {
      this.preds = preds;
    }
    );
  }

}
