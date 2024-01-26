import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { Order } from 'src/app/shared/interfaces/order';
import { KitchenServiceService } from 'src/app/services/kitchen/kitchen-service.service';

@Component({
  selector: 'app-orders-pending-delivering',
  templateUrl: './orders-pending-delivering.component.html',
  styleUrls: ['./orders-pending-delivering.component.css']
})
export class OrdersPendingDeliveringComponent implements OnInit {
deliveringPendingList: Order[] = [];
selectedOrderIndex: Order | null = null;
selectedOrder: Order | null = null

  constructor(private ordersService: OrdersService, private kitchenService: KitchenServiceService) { }

  ngOnInit(): void {
    this.loadWaiterOrdersList()
    this.ordersService.orderUpdated$.subscribe(() => {
      this.loadWaiterOrdersList();
    })

  }

  loadWaiterOrdersList() {
    this.ordersService. getPendingDeliveringOrders().subscribe((resp => {
      console.log('get order list ', resp);
      this.deliveringPendingList = resp;
      this.sortOrderByStatus();
      console.log(this.deliveringPendingList);
    })
    );
  }

  onOrderClick(order: Order): void {
    this.selectedOrderIndex = order;
    this.selectedOrder = order;
    console.log('Desde el order pending Waiter/orders', this.selectedOrder);
  }

  onDeliveredButtonClick(){
    if(this.selectedOrder){
      const orderId = this.selectedOrder.id;
      const newStatus = 'Delivered';
      
      console.log(orderId, 'Selected Order ID!!!!');
      
     this.ordersService.updateOrderStatus(orderId, newStatus).subscribe(updatedOrder => {
      this.ordersService.notifyOrderUpdated(updatedOrder.id)
    
     })
    }  
  }

  statusStyleWaiter(status: string): object {
    if (status === 'Delivering') {
      return { color: '#EE6A09' };
    } else if (status === 'Pending') {
      return { color: '#EE0909' };
    }
    return { color: '#3BBA26' }
  }

  sortOrderByStatus() {
    this.deliveringPendingList.sort((a: Order, b: Order): number => {
      if (a.status === b.status) {
        return 0
      }
      return a.status === 'Pending' ? 1 : -1
    })
  }
}
