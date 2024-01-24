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

  constructor(private ordersService: OrdersService, private kitchenService: KitchenServiceService) { }

  ngOnInit(): void {
    this.loadOrdersList();
    this.ordersService.orderUpdated$.subscribe(() => {
      this.loadOrdersList();
    })

  }

  loadOrdersList() {
    this.ordersService.getOrders().subscribe((resp => {
      this.orderList = resp;
      //this.order = resp.order
      this.sortOrderByStatus();
      console.log(this.orderList);
      //  this.ordersList.forEach(order => {
      //   this.ordersService.deleteOrders(order.id).subscribe(result => {
      //    console.log(result);
      //   })
      // })
    })
    );
  }

  onOrderClick(order: Order): void {
    this.kitchenService.setOrderKitchen(order)
    console.log('Desde el order kitchen', order);
  }


  statusStyle(status: string): object {
    if (status === 'Delivered') {
      return { color: '#3BBA26' };
    }
    return { color: '#EE6A09' }
  }

  sortOrderByStatus() {
    this.orderList.sort((a: Order, b: Order): number => {
      if (a.status === b.status) {
        return 0
      }
      return a.status === 'Delivered' ? 1 : -1
    })
  }
}
