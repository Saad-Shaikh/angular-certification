import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  buttonClicked: string = 'none';
  clicks: number[] = [];

  onButtonClick(): void {
    this.buttonClicked = this.buttonClicked === 'none' ? 'block' : 'none';
    this.clicks.push(this.clicks.length+1);
  }
}
