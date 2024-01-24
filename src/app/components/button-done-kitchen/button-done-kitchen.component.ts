import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order } from 'src/app/shared/interfaces/order';
import { KitchenServiceService } from 'src/app/services/kitchen/kitchen-service.service';
@Component({
  selector: 'app-button-done-kitchen',
  templateUrl: './button-done-kitchen.component.html',
  styleUrls: ['./button-done-kitchen.component.css']
})
export class ButtonDoneKitchenComponent implements OnInit {
  constructor(private kitchenService: KitchenServiceService) { }

  ngOnInit(): void {
  }
}
