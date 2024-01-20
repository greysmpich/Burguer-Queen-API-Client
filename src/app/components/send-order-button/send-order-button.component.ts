import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';
@Component({
  selector: 'app-send-order-button',
  templateUrl: './send-order-button.component.html',
  styleUrls: ['./send-order-button.component.css']
})
export class SendOrderButtonComponent implements OnInit {
  @Output() sendOrder = new EventEmitter<void>();

  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
    // this.orderService.clearInputSubject.subscribe(() => {
    //   console.log('Limpiando el input...');
    // });
  }

  onClick(){
    console.log('Desde el botón ENVIAR ORDEN');
    this.sendOrder.emit()
    //this.orderService.clearInput();
  }

}
