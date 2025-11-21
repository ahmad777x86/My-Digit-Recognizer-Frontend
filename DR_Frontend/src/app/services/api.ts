import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private url: string = "http://localhost:8000";

  constructor(private http: HttpClient) { }

  PostImage(imagedata: any) {
    return this.http.post("${this.url}/predict", imagedata);
  }
}
