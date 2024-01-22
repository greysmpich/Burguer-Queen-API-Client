import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { productInter } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 @Input() product: productInter | undefined;
 @Output() productClicked: EventEmitter<productInter> = new EventEmitter<productInter>();
 
  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
  }

  onProductClick() {
    if(this.product){
      this.productClicked.emit(this.product);
      this.ordersService.setClickedProduct(this.product)
      console.log('Desde el producto', this.product);
    }
  }
}
