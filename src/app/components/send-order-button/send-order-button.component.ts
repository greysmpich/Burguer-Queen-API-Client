import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-send-order-button',
  templateUrl: './send-order-button.component.html',
  styleUrls: ['./send-order-button.component.css']
})
export class SendOrderButtonComponent implements OnInit {
  @Output() sendOrder = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    console.log('Desde el botón ENVIAR ORDEN');
    this.sendOrder.emit()
  }

}
