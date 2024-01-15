import { Component, Input, OnInit } from '@angular/core';
import { productInter } from 'src/app/shared/interfaces/product';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 @Input() product: productInter | undefined;
 
  constructor() { }

  ngOnInit(): void {
  }

}
