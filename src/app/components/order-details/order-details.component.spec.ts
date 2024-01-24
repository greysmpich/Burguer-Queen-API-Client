import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ButtonDoneKitchenComponent } from '../button-done-kitchen/button-done-kitchen.component';
import { of } from 'rxjs';
import { OrderDetailsComponent } from './order-details.component';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Order } from 'src/app/shared/interfaces/order';
import { KitchenServiceService } from 'src/app/services/kitchen/kitchen-service.service';
import { productInter } from 'src/app/shared/interfaces/product';

const orderedProduct = { id: 1, name: 'Coffe', price: 15 } as productInter;
const mockShowOrder = {
  client: 'Reg',
  products: [{ qty: 1,  product: orderedProduct}] ,
  status: 'Pending',
  dataEntry: new Date(2024, 2, 4, 14, 25, 0),
  id: 1,
  total: 15,
} as Order

describe('OrderDetailsComponent', () => {
  let component: OrderDetailsComponent;
  let fixture: ComponentFixture<OrderDetailsComponent>;
  let ordersService: OrdersService;
  let kitchenService: KitchenServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDetailsComponent,ButtonDoneKitchenComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [OrdersService, KitchenServiceService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    ordersService = TestBed.inject(OrdersService);
    kitchenService = TestBed.inject(KitchenServiceService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update order status to "Delivering" and order time with correct elapsed time', fakeAsync(() => {
    component.showOrder = mockShowOrder;

    spyOn(kitchenService, 'calculateElapsedTime').and.returnValue('20 minutes 0 seconds');
    spyOn(ordersService, 'updateOrderTime').and.returnValue(of(mockShowOrder));
    spyOn(ordersService, 'updateOrderStatus').and.returnValue(of(mockShowOrder));
    spyOn(ordersService, 'notifyOrderUpdated').and.stub();

    component.onButtonDone();

    tick();
    expect(kitchenService.calculateElapsedTime).toHaveBeenCalledWith(mockShowOrder.dataEntry, jasmine.any(Date));
    expect(ordersService.updateOrderTime).toHaveBeenCalledWith(mockShowOrder.id, '20 minutes 0 seconds');
    expect(ordersService.updateOrderStatus).toHaveBeenCalledWith(mockShowOrder.id, 'Delivering');
    expect(ordersService.notifyOrderUpdated).toHaveBeenCalledWith(mockShowOrder.id);
  }));
});
