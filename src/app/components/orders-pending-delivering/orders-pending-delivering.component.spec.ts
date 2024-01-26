import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OrdersPendingDeliveringComponent } from './orders-pending-delivering.component';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { Order } from 'src/app/shared/interfaces/order';
import { of } from 'rxjs';

const mockOrders = [
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

const mockOrder: Order =  {
  client: 'Test Client',
  products: [],
  status: 'Delivered',
  dataEntry: new Date(),
  id: 1,
  total: 100,
};

const mockOrdersSameStatus = [
  {
    client: 'Client 3',
    id: 3,
    products: [],
    status: 'Delivering',
    dataEntry: new Date(),
    total: 50,
  },
  {
    client: 'Client 4',
    id: 4,
    products: [],
    status: 'Delivering',
    dataEntry: new Date(),
    total: 5000,
  }
];


describe('OrdersPendingDeliveringComponent', () => {
  let component: OrdersPendingDeliveringComponent;
  let fixture: ComponentFixture<OrdersPendingDeliveringComponent>;
  let ordersService: OrdersService;
  let httpTestingController: HttpTestingController;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersPendingDeliveringComponent ], 
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [OrdersService],
    })
    .compileComponents();
  });

  beforeEach(() => {
    ordersService = TestBed.inject(OrdersService);
    fixture = TestBed.createComponent(OrdersPendingDeliveringComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should refresh order list on orderUpdated$ event', () => {
    const loadOrdersListSpy = spyOn(component, 'loadWaiterOrdersList').and.callThrough();
     ordersService.orderUpdatedSubject.next(1);
       expect(loadOrdersListSpy).toHaveBeenCalled();

  });

  it('should load waiter orders list with status pending and delivering', fakeAsync(() => {
    const req = httpTestingController.expectOne(
      'https://api-burguer-queen-bqac1.onrender.com/orders'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockOrders);

    component.loadWaiterOrdersList();
    tick();

    const expectedOrders = [
      {
        client: 'Client 2',
        id: 2,
        products: [],
        status: 'Delivering',
        dataEntry: jasmine.any(Date),
        total: 1200,
      },
      {
        client: 'Client 1',
        id: 1,
        products: [],
        status: 'Pending',
        dataEntry: jasmine.any(Date),
        total: 100,        
      },
    ];

    expect(component.deliveringPendingList).toEqual(expectedOrders);
  }));

  it('should set selected order onOrderClick', fakeAsync(() => {
    component.onOrderClick(mockOrder);

    tick();

    expect(component.selectedOrderIndex).toEqual(mockOrder);
    expect(component.selectedOrder).toEqual(mockOrder);
  }));

  it('should update order status to "Delivered" onDeliveringButtonClick', fakeAsync(() => {
    component.selectedOrder = mockOrder;

    spyOn(ordersService, 'updateOrderStatus').and.returnValue(of(mockOrder));
    spyOn(ordersService, 'notifyOrderUpdated').and.stub();

    component.onDeliveredButtonClick();

    tick();

    expect(ordersService.updateOrderStatus).toHaveBeenCalledWith(mockOrder.id, 'Delivered');
    expect(ordersService.notifyOrderUpdated).toHaveBeenCalledWith(mockOrder.id);
  }));

  it('should return correct styles for different statuses', () => {
    const deliveringStyle = component.statusStyleWaiter('Delivering');
    expect(deliveringStyle).toEqual({ color: '#EE6A09' });
    const pendingStyle = component.statusStyleWaiter('Pending');
    expect(pendingStyle).toEqual({ color: '#EE0909' });
    const deliveredStatusStyle = component.statusStyleWaiter('OtherStatus');
    expect(deliveredStatusStyle).toEqual({ color: '#3BBA26' });
  });
  
  it('should sort orders by status', () => {

    component.deliveringPendingList = mockOrders;
    component.sortOrderByStatus();

    expect(component.deliveringPendingList).toEqual([
        {
          client: 'Client 2',
          id: 2,
          products: [],
          status: 'Delivering',
          dataEntry: jasmine.any(Date),
          total: 1200,
        },
        {
          client: 'Client 1',
          id: 1,
          products: [],
          status: 'Pending',
          dataEntry: jasmine.any(Date),
          total: 100,
        }
    ]);

    
     component.deliveringPendingList = mockOrdersSameStatus;
     component.sortOrderByStatus();

     expect(component.deliveringPendingList).toEqual(mockOrdersSameStatus);

  });

  it('should maintain the order of the orders if they have the same status', () => {   
     component.deliveringPendingList = mockOrdersSameStatus;
     component.sortOrderByStatus();

     expect(component.deliveringPendingList).toEqual(mockOrdersSameStatus);

  });
});
