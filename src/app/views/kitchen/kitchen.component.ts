import { Component, OnInit, Input } from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { Order } from 'src/app/shared/interfaces/order';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {
@Input() ordersList: Order[] = [];
//order: Order;

  constructor() { }

  ngOnInit(): void {
      // this.ordersService.getOrders().subscribe((resp => {
      //   this.ordersList = resp;
      //   //this.order = resp.order
      //  console.log(this.ordersList);
      // //  this.ordersList.forEach(order => {
      // //   this.ordersService.deleteOrders(order.id).subscribe(result => {
      // //    console.log(result);
      // //   })
      // // })
      //     })
      // );


    }


}
