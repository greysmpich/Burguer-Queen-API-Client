import { Component, OnInit} from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-client-name-input',
  templateUrl: './client-name-input.component.html',
  styleUrls: ['./client-name-input.component.css']
})
export class ClientNameInputComponent implements OnInit {
 clientName: string = '';
  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.ordersService.clientName$.subscribe(clientName => {
      this.clientName = clientName;
    });
  }
  
  updateClientNameinService(value:string){
   this.ordersService.setClientName(value);
  }
}
