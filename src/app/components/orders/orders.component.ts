import { Component, OnInit, Output } from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { Order } from 'src/app/shared/interfaces/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
 orderList: Order[] = [];
 
  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe((resp => {
      this.orderList = resp;
      //this.order = resp.order
     console.log(this.orderList);
    //  this.ordersList.forEach(order => {
    //   this.ordersService.deleteOrders(order.id).subscribe(result => {
    //    console.log(result);
    //   })
    // })
        })
    );
  }

}
