import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { Order } from 'src/app/shared/interfaces/order';

@Injectable({
  providedIn: 'root'
})

export class KitchenServiceService {
  private clickedOrderSubject = new BehaviorSubject<Order | null>(null);
  clickedOrder$ = this.clickedOrderSubject.asObservable();
  

  constructor() {
   }
  
  setOrderKitchen(order: Order) {
    this.clickedOrderSubject.next(order)
    }

  calculateElapsedTime(dataEntry: Date): string {
    const currentTime = new Date();
    const entryTime = new Date(dataEntry);
    const elapsedMilliseconds = currentTime.getTime() - entryTime.getTime();
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = Math.round(elapsedSeconds % 60);
    const totalTime = `${minutes} minutes ${seconds} seconds.`
    return totalTime;
  }

}
