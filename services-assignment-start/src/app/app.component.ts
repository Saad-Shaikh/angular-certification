import { Component, OnInit } from '@angular/core';
import { CounterService } from './services/counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  activeToInactive: number;
  inactiveToActive: number;

  constructor(private counterService: CounterService) {
    this.counterService.setToActive.subscribe(
      (count1: number) => {
        this.inactiveToActive = count1;
      }
    );

    this.counterService.setToInactive.subscribe(
      (count2: number) => {
        this.activeToInactive = count2;
      }
    );
  }

  ngOnInit(): void {
    this.activeToInactive = this.counterService.activeToInactive;
    this.inactiveToActive = this.counterService.inactiveToActive;
  }

}
