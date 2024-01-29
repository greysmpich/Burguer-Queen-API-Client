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
      this.showOrder = resp;     
    });
  }
  ngOnInit(): void {
  }

  onButtonDone(){
    if(this.showOrder){
      const orderId = this.showOrder.id;
      const newStatus = 'Delivering';
      const finalTime = this.kitchenService.calculateElapsedTime(this.showOrder.dataEntry, new Date())

      this.ordersService.updateOrderTime(orderId, finalTime).subscribe();
     this.ordersService.updateOrderStatus(orderId, newStatus).subscribe(updatedOrder => {
      this.ordersService.notifyOrderUpdated(updatedOrder.id)
     })
    }  
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
