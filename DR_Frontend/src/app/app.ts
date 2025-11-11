import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'DR_Frontend';
  name: string = "World";
  state: boolean = true;
  image: File | null = null;

  Click() {
    if (this.state) {
      this.name = "Angular";
      this.state = false;
    }
    else {
      this.name = "World";
      this.state = true;
    }
  }

  OnfileSelected(event: any) {
    this.image = event.target.files[0];
    console.log("Selected File Successfully");
  }
}
