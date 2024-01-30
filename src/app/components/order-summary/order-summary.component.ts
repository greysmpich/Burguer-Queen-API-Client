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
  totalPrice: number = 0;
  alertMessage: string | null = null;

  constructor(private ordersService: OrdersService) { 
    this.productSubscription = this.ordersService.getClickedProduct().subscribe(product => {
      if(product) {
        this.onProductClicked(product)
       console.log(this.orderedProducts) 
      }
    })
    
    this.clientNameSubscription = this.ordersService.clientName$.subscribe(value => {
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
  }

  onSendOrderClick(): string | void {
    if (this.clientName === '' && this.orderedProducts.length === 0) {
     return this.alertMessage = 'There are no products selected and client name is null.';
    } else if (this.clientName === '') {
      return  this.alertMessage = 'Client name is required';
    } else if (this.orderedProducts.length === 0) {
      return this.alertMessage = 'No products selected';}
    const order: Order = {
      client: this.clientName, 
      products: this.orderedProducts,
      status: 'Pending', 
      dataEntry: new Date(),
      id: 0, 
      total: this.totalPrice,
    };
    this.ordersService.postOrder(order).subscribe((response => {
      this.ordersService.setClientName('')
      this.orderedProducts =  [];
      this.totalPrice = 0; 
      this.alertMessage = 'Order sent successfully';
      setTimeout(() => {
        this.alertMessage = null;
      }, 2000); // 3000 milliseconds (3 seconds)
 

    }),);
  }

  deleteProduct(product: orderedProducts) {
    const indexProduct = this.orderedProducts.indexOf(product)
   if (product.qty > 1 && product.product?.price) {
   product.qty -= 1
   this.totalPrice -= product.product?.price
   console.log(this.orderedProducts);
   }
   else if (product.qty === 1 && product.product?.price) {
    this.orderedProducts.splice(indexProduct, 1)
     this.totalPrice -= product.product?.price
     console.log(this.orderedProducts);     
   } 

   }
  ngOnDestroy() {
    this.productSubscription.unsubscribe();
    this.clientNameSubscription.unsubscribe()
  }
}
