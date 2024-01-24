import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { OrdersComponent } from './orders.component';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { HttpClientTestingModule, HttpTestingController, } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Order } from 'src/app/shared/interfaces/order';
import { KitchenServiceService } from 'src/app/services/kitchen/kitchen-service.service';
import { of } from 'rxjs';

const mockOrders = [
  {
    client: 'Client 1',
    id: 1,
    products: [],
    status: 'Pending',
    dataEntry: new Date(),
    total: 100,
    elapsedTime: '2 minutes',
  },
];

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  let ordersService: OrdersService;
  let kitchenService: KitchenServiceService;
  let httpTestingController: HttpTestingController;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdersComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [OrdersService, KitchenServiceService],
    }).compileComponents();
  });

  beforeEach(() => {
    ordersService = TestBed.inject(OrdersService);
    kitchenService = TestBed.inject(KitchenServiceService);
    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load orders list', fakeAsync(() => {
    const req = httpTestingController.expectOne(
      'https://api-burguer-queen-bqac1.onrender.com/orders'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockOrders);

    component.loadOrdersList();
    tick();

    const expectedOrders = [
      {
        client: 'Client 1',
        id: 1,
        products: [],
        status: 'Pending',
        dataEntry: jasmine.any(Date),
        total: 100,
        elapsedTime: jasmine.any(String),
      },
    ];

    expect(component.orderList).toEqual(expectedOrders);
  }));
  it('should set selected order and update kitchen service onOrderClick', fakeAsync(() => {
    const mockOrder: Order = {
      client: 'Test Client',
      products: [],
      status: 'Pending',
      dataEntry: new Date(),
      id: 1,
      total: 100,
      elapsedTime: 0,
    };
    component.onOrderClick(mockOrder);
    tick();
    expect(component.selectedOrderIndex).toEqual(mockOrder);
    let updatedOrder: Order | null = null;
    kitchenService.clickedOrder$.subscribe((resp) => {
      updatedOrder = resp;
    });
    expect(updatedOrder).toEqual(jasmine.objectContaining(mockOrder));
  }));
  it('should return correct styles for different statuses', () => {
    const deliveringStyle = component.statusStyle('Delivering');
    expect(deliveringStyle).toEqual({ color: '#3BBA26' });
    const pendingStyle = component.statusStyle('Pending');
    expect(pendingStyle).toEqual({ color: '#EE6A09' });
    const otherStatusStyle = component.statusStyle('OtherStatus');
    expect(otherStatusStyle).toEqual({ color: '#3BBA26' });
  });
  it('should sort orders by status', () => {
    const unorderedOrders = [
      {
        client: 'Client 2',
        id: 2,
        products: [],
        status: 'Delivering',
        dataEntry: new Date(),
        total: 150,
        elapsedTime: 0,
      },
      {
        client: 'Client 1',
        id: 1,
        products: [],
        status: 'Pending',
        dataEntry: new Date(),
        total: 100,
        elapsedTime: 0,
      },
    ];

    component.orderList = unorderedOrders;
    component.sortOrderByStatus();

    expect(component.orderList).toEqual([
      {
        client: 'Client 1',
        id: 1,
        products: [],
        status: 'Pending',
        dataEntry: new Date(),
        total: 100,
        elapsedTime: 0,
      },
      {
        client: 'Client 2',
        id: 2,
        products: [],
        status: 'Delivering',
        dataEntry: new Date(),
        total: 150,
        elapsedTime: 0,
      },
    ]);

    const orderedOrders = [
      {
        client: 'Client 1',
        id: 1,
        products: [],
        status: 'Pending',
        dataEntry: new Date(),
        total: 100,
        elapsedTime: 0,
      },

      {
        client: 'Client 2',
        id: 2,
        products: [],
        status: 'Delivering',
        dataEntry: new Date(),
        total: 150,
        elapsedTime: 0,
      },
    ];

    component.orderList = orderedOrders;
    component.sortOrderByStatus();

    expect(component.orderList).toEqual(orderedOrders);

    const sameOrders = [
      {
        client: 'Client 1',
        id: 1,
        products: [],
        status: 'Pending',
        dataEntry: new Date(),
        total: 100,
        elapsedTime: 0,
      },
      {
        client: 'Client 2',
        id: 2,
        products: [],
        status: 'Pending',
        dataEntry: new Date(),
        total: 150,
        elapsedTime: 0,
      },
    ];

    component.orderList = sameOrders;
    let resp = component.sortOrderByStatus();

    expect(resp).toEqual(undefined);
  });
  
  it('should refresh order list on orderUpdated$ event', () => {
    const loadOrdersListSpy = spyOn(component, 'loadOrdersList').and.callThrough();
     ordersService.orderUpdatedSubject.next(1);
       expect(loadOrdersListSpy).toHaveBeenCalled();

  });
});
