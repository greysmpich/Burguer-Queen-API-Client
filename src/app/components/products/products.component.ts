import { Component, Input, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { productInter } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
@Input() product: productInter | undefined;

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
  }

  onProductClick() {
   if(this.product){
      this.ordersService.setClickedProduct(this.product)
    }
  }
}
