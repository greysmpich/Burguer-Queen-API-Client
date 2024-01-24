import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { KitchenComponent } from './kitchen.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { LogoutComponent } from 'src/app/components/logout/logout.component';
import { MatDialogModule } from '@angular/material/dialog';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { OrdersComponent } from 'src/app/components/orders/orders.component';
import { OrderDetailsComponent } from 'src/app/components/order-details/order-details.component';
import { ButtonDoneKitchenComponent } from 'src/app/components/button-done-kitchen/button-done-kitchen.component';

describe('KitchenComponent', () => {
  let component: KitchenComponent;
  let fixture: ComponentFixture<KitchenComponent>;
  let ordersService: OrdersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KitchenComponent, HeaderComponent, LogoutComponent, OrdersComponent, OrderDetailsComponent, ButtonDoneKitchenComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, MatDialogModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenComponent);
    component = fixture.componentInstance;
    ordersService = TestBed.inject(OrdersService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
