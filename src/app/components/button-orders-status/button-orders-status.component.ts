import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { Order } from 'src/app/shared/interfaces/order';

@Component({
  selector: 'app-button-orders-status',
  templateUrl: './button-orders-status.component.html',
  styleUrls: ['./button-orders-status.component.css']
})
export class ButtonOrdersStatusComponent implements OnInit {
notificationsNumber: number = 0;
deliveringList: Order[] = [];
deliveringLength: number = 0

//private notificationSubscription: Subscription;

  constructor( private ordersService: OrdersService) { 

    this.ordersService.getPendingDeliveringOrders().subscribe((resp => {
      this.deliveringList = resp;
      this.notificationsNumber = this.deliveringList.filter(object => object.status === 'Delivering').length;
    }));

  }

  ngOnInit(): void {

  }

//   ngOnDestroy() {
//     this.subscription.unsubscribe();
//   }
 }