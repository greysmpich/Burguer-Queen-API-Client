import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { Order } from 'src/app/shared/interfaces/order';
import { MatDialog } from '@angular/material/dialog';
import { ModalOrderNotReadyComponent } from '../modal-order-not-ready/modal-order-not-ready.component';



@Component({
  selector: 'app-orders-pending-delivering',
  templateUrl: './orders-pending-delivering.component.html',
  styleUrls: ['./orders-pending-delivering.component.css'],  
})
export class OrdersPendingDeliveringComponent implements OnInit {
deliveringPendingList: Order[] = [];
selectedOrderIndex: Order | null = null;
selectedOrder: Order | null = null

  constructor(private ordersService: OrdersService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadWaiterOrdersList()
    this.ordersService.orderUpdated$.subscribe(() => {
      this.loadWaiterOrdersList();
    })

  }

  loadWaiterOrdersList() {
    this.ordersService.getPendingDeliveringOrders().subscribe((resp => {
      this.deliveringPendingList = resp;
      this.sortOrderByStatus();
    })
    );
  }

  onOrderClick(order: Order): void {
    this.selectedOrderIndex = order;
    this.selectedOrder = order;
  }

  onDeliveredButtonClick(){
    if(this.selectedOrder && this.selectedOrder.status === 'Delivering'){
      const orderId = this.selectedOrder.id;
      const newStatus = 'Delivered';
      this.selectedOrderIndex = null;
            
     this.ordersService.updateOrderStatus(orderId, newStatus).subscribe(updatedOrder => {
      this.ordersService.notifyOrderUpdated(updatedOrder.id)
    
     })
    }  
    if(this.selectedOrder && this.selectedOrder.status === 'Pending'){
      this.openDialog()
    }
  }

  openDialog(): void {
    this.dialog.open(ModalOrderNotReadyComponent);
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
