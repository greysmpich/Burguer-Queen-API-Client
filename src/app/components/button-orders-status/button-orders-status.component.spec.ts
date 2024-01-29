import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ButtonOrdersStatusComponent } from './button-orders-status.component';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

const mockOrders1 = [
  {
    client: 'Client 1',
    id: 1,
    products: [],
    status: 'Pending',
    dataEntry: new Date(),
    total: 100,
  },
  {
    client: 'Client 2',
    id: 2,
    products: [],
    status: 'Delivering',
    dataEntry: new Date(),
    total: 1200,
  }
];

const mockOrders2 = [
  {
    client: 'Client 1',
    id: 1,
    products: [],
    status: 'Pending',
    dataEntry: new Date(),
    total: 100,
  }
];

describe('ButtonOrdersStatusComponent', () => {
  let component: ButtonOrdersStatusComponent;
  let fixture: ComponentFixture<ButtonOrdersStatusComponent>;
  let ordersService: OrdersService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonOrdersStatusComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [ OrdersService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonOrdersStatusComponent);
    component = fixture.componentInstance;
    ordersService = TestBed.inject(OrdersService);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load waiter orders list with status pending and delivering', fakeAsync(() => {
    const req = httpTestingController.expectOne(
      'https://api-burguer-queen-bqac1.onrender.com/orders'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockOrders2);

   
    tick();

    const numPedidosDelivering = component.deliveringList?.filter(object => object.status === 'Delivering')?.length ?? 0;

    expect(component.deliveringList).toEqual(mockOrders2);
    expect(component.notificationsNumber).toEqual(numPedidosDelivering);
  }));

  
});
