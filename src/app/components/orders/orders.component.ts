import { Component, OnInit } from '@angular/core';
import { KitchenServiceService } from 'src/app/services/kitchen/kitchen-service.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { Order } from 'src/app/shared/interfaces/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderList: Order[] = [];
  selectedOrderIndex: Order | null = null;
  notificationsNumber: number = 0;

  constructor(private ordersService: OrdersService, private kitchenService: KitchenServiceService) { 
    this.loadOrdersList();
    this.ordersService.orderUpdated$.subscribe(() => {
      this.loadOrdersList();
    })
  }

  ngOnInit(): void {
   

  }

  loadOrdersList() {
    this.ordersService.getOrders().subscribe((resp => {
      console.log('get order list ', resp);
      
      this.orderList = resp;
      //this.order = resp.order
      this.sortOrderByStatus();
      console.log(this.orderList);
      this.notificationsNumber = this.orderList?.filter(object => object.status === 'Delivering')?.length ?? 0
      this.ordersService.notificationUpdatedSubject.next(this.notificationsNumber)
       //  this.ordersService.notificationUpdated$.subscribe(notif => 
       //   this.notificationsNumber = notif
       //   );
      console.log(this.notificationsNumber );

    })
    );
   
  }

  onOrderClick(order: Order): void {
    this.selectedOrderIndex = order;
    this.kitchenService.setOrderKitchen(order)
    console.log('Desde el order kitchen', order);
  }


  statusStyle(status: string): object {
    if (status === 'Delivering') {
      return { color: '#3BBA26' };
    } 
    return status === 'Pending' ? { color: '#EE6A09' } : { color: '#3BBA26' };
  }

  sortOrderByStatus() {
    this.orderList.sort((a: Order, b: Order): number => {
      if (a.status === b.status) {
        return 0
      }
      return a.status === 'Delivering' ? 1 : -1
    })
  }
}
