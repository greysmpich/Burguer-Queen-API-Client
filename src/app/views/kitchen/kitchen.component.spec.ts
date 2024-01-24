import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { KitchenComponent } from './kitchen.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { LogoutComponent } from 'src/app/components/logout/logout.component';
import { MatDialogModule } from '@angular/material/dialog';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { of } from 'rxjs';
import { productInter } from 'src/app/shared/interfaces/product';

const mockOrders = [
  {
  client: 'Client1',
  products: [ { qty: 1,  product: {id: 5, name: 'mock product', price: 10} as productInter } ],
  status: 'Pending',
  dataEntry: new Date,
  id: 1723,
  total: 10
}
]

describe('KitchenComponent', () => {
  let component: KitchenComponent;
  let fixture: ComponentFixture<KitchenComponent>;
  let ordersService: OrdersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KitchenComponent, HeaderComponent, LogoutComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, MatDialogModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenComponent);
    component = fixture.componentInstance;
    ordersService = TestBed.inject(OrdersService);
    spyOn(ordersService, 'getOrders').and.returnValue(of(mockOrders));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
