import { Component, OnInit } from '@angular/core';
import { KitchenServiceService } from 'src/app/services/kitchen-service.service';
import { Order } from 'src/app/shared/interfaces/order';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  showOrder: Order | null = null
  private subscription: Subscription;

  constructor(private kitchenService: KitchenServiceService) {
    this.subscription = this.kitchenService.clickedOrder$.subscribe(resp => {
      this.showOrder = resp;
      console.log(this.showOrder, ' show order');
    });
  }
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // Desuscribirse para evitar fugas de memoria
    this.subscription.unsubscribe();
  }

}
