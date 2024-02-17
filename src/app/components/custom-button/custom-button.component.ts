import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { Order } from 'src/app/shared/interfaces/order';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.css']
})
export class CustomButtonComponent implements OnInit {
  @Input() shape: 'rectangle' | 'circle' = 'rectangle';
  @Input() color: string = '#EE6A09'; 
  @Input() textColor: string = '#ffffff ';
  @Input() position: string | undefined;
  @Input() marginLeft: string | undefined;
  @Input() top: string | undefined;
  @Input() borderRadius: string = '5px';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() btnName: string | undefined;
  @Input() imageSrc: string | null = null;
  @Input() btnClass: string | undefined;
  @Input() isSelected: boolean = false;
  @Output() selected: EventEmitter<void> = new EventEmitter<void>();
  @Input() showNotifications: boolean = false;
  @Input() notificationsNumber: number = 0;
  deliveringList: Order[] = [];
  // @Input() shape: 'rectangle' | 'circle' = 'rectangle';
  // @Input() color: string = '#007bff'; // Color predeterminado: azul
  // @Input() borderRadius: string = '5px';

  constructor( private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.fetchNotifications()
   
  }

  select(): void {
    this.selected.emit();
}

fetchNotifications() {
  this.ordersService.getPendingDeliveringOrders().subscribe((resp => {
    this.deliveringList = resp;
    this.notificationsNumber = this.deliveringList.filter(object => object.status === 'Delivering').length;
  }));
}

  getButtonSelectedStyle() {
    return this.isSelected ? { 'background-color': '#EE6A09', 'color': 'white' } : { 'color': 'black'}
  }
}
