import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { Order } from 'src/app/shared/interfaces/order';

@Component({
  selector: 'app-orders-delivered',
  templateUrl: './orders-delivered.component.html',
  styleUrls: ['./orders-delivered.component.css']
})
export class OrdersDeliveredComponent implements OnInit {
deliveredOrderList: Order[] = [];

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.ordersService.getDeliveredOrders().subscribe((resp => {
      console.log('get order list ', resp);
      this.deliveredOrderList = resp;
      console.log(this.deliveredOrderList);
    }))
  }

  statusStyleWaiter(status: string): object {
    if (status === 'Delivering') {
      return { color: '#EE6A09' };
    } else if (status === 'Pending') {
      return { color: '#EE0909' };
    }
    return { color: '#3BBA26' }
  }
}
