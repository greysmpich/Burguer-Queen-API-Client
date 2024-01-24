import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order } from 'src/app/shared/interfaces/order';

@Component({
  selector: 'app-button-done-kitchen',
  templateUrl: './button-done-kitchen.component.html',
  styleUrls: ['./button-done-kitchen.component.css']
})
export class ButtonDoneKitchenComponent implements OnInit {
@Input() showOrder: Order | null | undefined;
@Output() doneClicked: EventEmitter<Order> = new EventEmitter<Order>();

  constructor() { }

  ngOnInit(): void {
  }

  onDoneClick(){
    if(this.showOrder){
      this.doneClicked.emit(this.showOrder);
    }
  }
}
