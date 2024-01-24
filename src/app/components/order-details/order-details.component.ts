import { Component, OnInit } from '@angular/core';
import { KitchenServiceService } from 'src/app/services/kitchen/kitchen-service.service';
import { Order } from 'src/app/shared/interfaces/order';
import { Subscription } from 'rxjs';
import { OrdersService } from 'src/app/services/orders/orders.service';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  showOrder: Order | null = null
  private subscription: Subscription;

  constructor(private kitchenService: KitchenServiceService, private ordersService: OrdersService) {
    this.subscription = this.kitchenService.clickedOrder$.subscribe(resp => {
      this.showOrder = resp;      console.log(this.showOrder, ' show order');
    });
  }
  ngOnInit(): void {
  }

  onButtonDone(){
    if(this.showOrder){
      const orderId = this.showOrder.id;
      const newStatus = 'Delivered';

     this.ordersService.updateOrderStatus(orderId, newStatus).subscribe(updatedOrder => {
      
      console.log('Order Done', updatedOrder);
      this.ordersService.notifyOrderUpdated(updatedOrder.id)
     })
    }  
  }

  ngOnDestroy(): void {
    // Desuscribirse para evitar fugas de memoria
    this.subscription.unsubscribe();
  }

}
