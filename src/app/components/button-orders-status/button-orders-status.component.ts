import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { Order } from 'src/app/shared/interfaces/order';

@Component({
  selector: 'app-button-orders-status',
  templateUrl: './button-orders-status.component.html',
  styleUrls: ['./button-orders-status.component.css']
})
export class ButtonOrdersStatusComponent implements OnInit {
notificationsNumber: any;
deliveringList: Order[] = [];

//private notificationSubscription: Subscription;

  constructor( private ordersService: OrdersService) { 

    this.ordersService.getPendingDeliveringOrders().subscribe((resp => {
      this.deliveringList = resp;
      this.notificationsNumber = this.deliveringList?.filter(object => object.status === 'Delivering')?.length ?? 0;
    }));

  }

  ngOnInit(): void {

    
  }

//   ngOnDestroy() {
//     this.subscription.unsubscribe();
//   }
 }