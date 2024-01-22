import { Component, OnInit, Input } from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { productInter } from 'src/app/shared/interfaces/product';
import { Order, orderedProducts } from 'src/app/shared/interfaces/order';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  @Input() product: productInter | undefined;
  orderedProducts: orderedProducts[] = [];
  private productSubscription: Subscription;
  private clientNameSubscription: Subscription;
  clientName: string = '';
  totalPrice: number = 0


  constructor(private orderService: OrdersService) { 
    this.productSubscription = this.orderService.getClickedProduct().subscribe(product => {
      if(product) {
        this.onProductClicked(product)
      }
    })
    this.clientNameSubscription = this.orderService.clientName$.subscribe(value => {
      this.clientName = value;
    });
  }

  ngOnInit(): void {}

  onProductClicked(product: productInter) {
    const existingProduct = this.orderedProducts.find(orderedProduct => orderedProduct.product?.id === product.id);
    
  if (existingProduct) {
    existingProduct.qty += 1;
    this.totalPrice += product.price 

  } else {
    this.orderedProducts.push({ qty: 1, product });
    this.totalPrice += product.price 
  }
 
  console.log('Desde summary: PRODUCTO AÑADIDO A LA ORDEN', this.orderedProducts);
  console.log(this.totalPrice);
  
  }

  onSendOrderClick() {
    const order: Order = {
      client: this.clientName, 
      products: this.orderedProducts,
      status: 'Pending', 
      dataEntry: new Date(),
      id: 0, 
      total: this.totalPrice,
    };

    this.orderService.postOrder(order).subscribe((response => {
      console.log('Orden enviada exitosamente', response);
      this.orderService.setClientName('')
      this.orderedProducts =  [];
      this.totalPrice = 0; 
    }),
    );
  }

deleteProduct(product: orderedProducts) {
 const indexProduct = this.orderedProducts.indexOf(product)
console.log(indexProduct, ' index');
if (product.qty > 1 && product.product?.price) {
product.qty -= 1
this.totalPrice -= product.product?.price
}
else if (product.qty === 1 && product.product?.price) {
  this.orderedProducts.splice(indexProduct, 1)
  this.totalPrice -= product.product?.price
}
}


  ngOnDestroy() {
    this.productSubscription.unsubscribe();
    this.clientNameSubscription.unsubscribe()
  }
}
