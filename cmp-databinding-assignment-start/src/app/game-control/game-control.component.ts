import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output() gameStarted: EventEmitter<number> = new EventEmitter<number>();
  number: number = 0;
  myInterval;

  constructor() { }

  ngOnInit(): void {
  }

  onStartGame(): void {
    this.myInterval = setInterval(()=>{
      this.gameStarted.emit(this.number);
      this.number += 1;
    }, 1000);
  }

  onStopGame(): void {
    clearInterval(this.myInterval);
  }

}
