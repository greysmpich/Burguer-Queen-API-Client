import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { productInter } from 'src/app/shared/interfaces/product';
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
}
