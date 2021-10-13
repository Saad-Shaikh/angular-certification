import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username: string = '';

  isUsernameEmpty(): boolean {
    if(this.username == '')
      return true;
    return false;
  }

  resetUsername(): void {
    this.username = '';
  }
}
