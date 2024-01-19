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
    // Añade el producto a la lista de productos ordenados
    this.orderedProducts.push({ qty: 1, product });
    console.log('Desde summary: PRODUCTOP AÑADIDO A LA ORDEN', this.orderedProducts);
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
      id: 0  // Puedes establecer un valor inicial para el ID
    };

    this.orderService.postOrder(order).subscribe((response => {
      console.log('Orden enviada exitosamente', response);
    }),
    );

    this.orderedProducts =  [];
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }
}
