import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-client-name-input',
  templateUrl: './client-name-input.component.html',
  styleUrls: ['./client-name-input.component.css']
})
export class ClientNameInputComponent implements OnInit {

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
  }

  updateClientNameinService(value:string){
    this.ordersService.setClientName(value);
  }
}
