import { Component, OnInit, Output, Input } from '@angular/core';
import { KitchenServiceService } from 'src/app/services/kitchen-service.service';
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
  
  onOrderClick(order: Order):void {
 this.kitchenService.setOrderKitchen(order)
  console.log('Desde el order kitchen', order);
}

}
