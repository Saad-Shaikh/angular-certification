import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CounterService {
  activeToInactive: number = 0;
  inactiveToActive: number = 0;

  setToInactive = new EventEmitter<number>();
  setToActive = new EventEmitter<number>();

  onSetToInactive(): void {
    this.activeToInactive += 1;
    this.setToInactive.emit(this.activeToInactive);
  }

  onSetToActive(): void {
    this.inactiveToActive += 1;
    this.setToActive.emit(this.inactiveToActive);
  }
}
