import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { Order } from 'src/app/shared/interfaces/order';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {
ordersList: Order[] = [];

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
      this.ordersService.getOrders().subscribe((resp => {
        this.ordersList = resp
       console.log(this.ordersList);
      //  this.ordersList.forEach(order => {
      //   this.ordersService.deletOrders(order.id).subscribe(result => {
      //    console.log(result);
      //   })
      // })
          })
      );


    }


}
