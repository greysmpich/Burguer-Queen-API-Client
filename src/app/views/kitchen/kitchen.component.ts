import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/shared/interfaces/order';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {
@Input() ordersList: Order[] = [];
  constructor() { }
  ngOnInit(): void {}
}
