import { ComponentFixture, TestBed, tick, fakeAsync  } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { OrdersDeliveredComponent } from './orders-delivered.component';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { productInter } from 'src/app/shared/interfaces/product';
import { Order } from 'src/app/shared/interfaces/order';
import { of } from 'rxjs';

const orderedProduct = { id: 1, name: 'Coffe', price: 15 } as productInter;
const mockDeliveredOrders: Order[] = [
  {
    client: 'Lilac',
    products: [{ qty: 1, product: orderedProduct }],
    status: 'Delivered',
    dataEntry: new Date(2024, 2, 4, 13, 33, 0),
    id: 1,
    total: 15,
    elapsedTime: 'someString',
  },
];

describe('OrdersDeliveredComponent', () => {

  let component: OrdersDeliveredComponent;
  let fixture: ComponentFixture<OrdersDeliveredComponent>;
  let service: OrdersService;
  //let ordersServiceSpy: jasmine.SpyObj<OrdersService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('OrdersService', ['getDeliveredOrders']);

    await TestBed.configureTestingModule({
      declarations: [ OrdersDeliveredComponent ],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [OrdersService],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersDeliveredComponent);
    component = fixture.componentInstance;
    //ordersServiceSpy = TestBed.inject(OrdersService) as jasmine.SpyObj<OrdersService>;
    service = TestBed.inject(OrdersService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return the correct styles for Delivering status', () => {
    const status = 'Delivering';
    const styles = component.statusStyleWaiter(status);
    expect(styles).toEqual({ color: '#EE6A09' });
  });

  it('should return the correct styles for Pending status', () => {
    const status = 'Pending';
    const styles = component.statusStyleWaiter(status);
    expect(styles).toEqual({ color: '#EE0909' });
  });

  it('should return the default styles for other statuses', () => {
    const status = 'SomeOtherStatus';
    const styles = component.statusStyleWaiter(status);
    expect(styles).toEqual({ color: '#3BBA26' });
  });
  it('should reload delivered orders', fakeAsync(() => {
    spyOn(service, 'getDeliveredOrders').and.returnValue(of(mockDeliveredOrders));
    component.reloadDelivered();
    tick();
    expect(component.deliveredOrderList).toEqual(mockDeliveredOrders);
  }));
  it('should call reloadDelivered on ngOnInit and when orderUpdatedSubject emits', () => {
     const reloadDeliveredSpy = spyOn(component, 'reloadDelivered');
    component.ngOnInit();
      expect(reloadDeliveredSpy).toHaveBeenCalled();
      service.orderUpdatedSubject.next(1);
      fixture.detectChanges();
    expect(reloadDeliveredSpy).toHaveBeenCalledTimes(3);
  });

});  
   

