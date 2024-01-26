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
private subscription!: Subscription;

  constructor( private ordersService: OrdersService) { 
    // this.subscription = this.ordersService.deliveringPendingList$.subscribe(array => {
    //   this.notificationsNumber = array?.filter(object => object.status === 'Delivering')?.length ?? 0;
    //   console.log(this.notificationsNumber);
      
    // })

    this.ordersService. getPendingDeliveringOrders().subscribe((resp => {
      this.deliveringList = resp;
      this.notificationsNumber = this.deliveringList?.filter(object => object.status === 'Delivering')?.length ?? 0;
      console.log(this.notificationsNumber);
    }));

  }

  ngOnInit(): void {
  }

//   ngOnDestroy() {
//     this.subscription.unsubscribe();
//   }
 }
