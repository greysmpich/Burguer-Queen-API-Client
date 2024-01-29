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
    // this.ordersService.notificationUpdated$.subscribe(res => {
    //   this.notificationsNumber = res;
    //   console.log('Desde botón notificaciones', res);
      
    // })

 
    // this.subscription = this.ordersService.deliveringPendingList$.subscribe(array => {
    //   this.notificationsNumber = array?.filter(object => object.status === 'Delivering')?.length ?? 0;
    //   console.log(this.notificationsNumber);
      
    // })

    // this.ordersService.getPendingDeliveringOrders().subscribe((resp => {
    //   this.deliveringList = resp;
    //   this.notificationsNumber = this.deliveringList?.filter(object => object.status === 'Delivering')?.length ?? 0;
    //   console.log(this.notificationsNumber);
    // }));

  }

  ngOnInit(): void {
     this.ordersService.notificationUpdated$.subscribe(resp =>{
      console.log(resp, 'resp');
      
    this.notificationsNumber = resp
    }) 
    //  .subscribe(resp => {
     
    //     this.notificationsNumber = resp

    //     console.log('Se reciben notif desde kitchen', this.notificationsNumber);
    // })
    
  }

//   ngOnDestroy() {
//     this.subscription.unsubscribe();
//   }
 }