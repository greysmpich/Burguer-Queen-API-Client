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
  clientName: string = '';
  totalPrice: number = 0

  constructor(private orderService: OrdersService) { 
    this.productSubscription = this.orderService.getClickedProduct().subscribe(product => {
      if(product) {
        this.onProductClicked(product)
      }
    })
  }

  ngOnInit(): void {
  }

  onProductClicked(product: productInter) {
    const existingProduct = this.orderedProducts.find(orderedProduct => orderedProduct.product?.id === product.id);
    
  if (existingProduct) {
    existingProduct.qty += 1;
    this.totalPrice += product.price * existingProduct.qty;

  } else {
    this.orderedProducts.push({ qty: 1, product });
    this.totalPrice += product.price 
  }
 
  console.log('Desde summary: PRODUCTO AÑADIDO A LA ORDEN', this.orderedProducts);
  console.log(this.totalPrice);
  
  }

  onSendOrderClick() {
    this.orderService.getClientName().subscribe(value => {
      this.clientName = value;
    })
    // Envía la orden a la API
    const order: Order = {
      client: this.clientName, 
      products: this.orderedProducts,
      status: 'Pending',  // Puedes establecer el estado como necesario
      dataEntry: new Date(),
      id: 0,  // Puedes establecer un valor inicial para el ID
      total: this.totalPrice,
    };

    this.orderService.postOrder(order).subscribe((response => {
      console.log('Orden enviada exitosamente', response);
      this.orderedProducts =  [];
     // this.orderService.clearInput()
      this.totalPrice = 0; 
    }),
    );

  
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }
}
