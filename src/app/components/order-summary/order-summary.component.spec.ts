import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderSummaryComponent } from './order-summary.component';
import { CustomButtonComponent } from '../custom-button/custom-button.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Order } from 'src/app/shared/interfaces/order';
import { productInter } from 'src/app/shared/interfaces/product';
import { OrdersService } from 'src/app/services/orders/orders.service';

describe('OrderSummaryComponent', () => {
  let component: OrderSummaryComponent;
  let fixture: ComponentFixture<OrderSummaryComponent>;
  let httpTestingController: HttpTestingController;
  let ordersService: OrdersService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderSummaryComponent, CustomButtonComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [OrdersService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSummaryComponent);
    component = fixture.componentInstance;
    ordersService = TestBed.inject(OrdersService);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should delete an element correctly', () => {
    const productToDelete = {
      qty: 2,
      product: {
        id: 1,
        name: 'Milk',
        price: 10,
        image: 'img',
        type: 'Breakfast',
        dateEntry: '22-11-2024',
      },
    };
    component.orderedProducts = [productToDelete];
    component.totalPrice = 20;
    component.deleteProduct(productToDelete);
    expect(component.orderedProducts.length).toBe(1);
    expect(component.totalPrice).toBe(10);
  });
  it('should remove a product with qty equal to 1 correctly', () => {
    const productToDelete = {
      qty: 1,
      product: {
        id: 1,
        name: 'Milk',
        price: 10,
        image: 'img',
        type: 'Breakfast',
        dateEntry: '22-11-2024',
      },
    };
    component.orderedProducts = [productToDelete];
    component.totalPrice = 10;
    component.deleteProduct(productToDelete);
    expect(component.orderedProducts.length).toBe(0);
    expect(component.totalPrice).toBe(0);
  });

  it('should submit an order successfully and reset the values if the customer name and at least one selected product exists', fakeAsync(() => {
    component.clientName = 'Cliente de prueba';
    component.orderedProducts = [{
      qty: 2,
      product: {
        id: 1,
        name: 'Milk',
        price: 10,
        image: 'img',
        type: 'Breakfast',
        dateEntry: '22-11-2024',
      },
    },];
    component.totalPrice = 20;
    component.onSendOrderClick();
    const expectedUrl = 'https://api-burguer-queen-bqac1.onrender.com/orders';
    const req = httpTestingController.expectOne('https://api-burguer-queen-bqac1.onrender.com/orders'); 
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(jasmine.objectContaining({
      client: 'Cliente de prueba',
          products: component.orderedProducts,
          status: 'Pending',
          dataEntry: new Date(),
          id: 0,
          total: 20,
    }));
    const mockResponse: Order = {
          client: 'Cliente de prueba',
          products: component.orderedProducts,
          status: 'Pending',
          dataEntry: new Date(),
          id: 0,
          total: 20,
        };
   
    req.flush({mockResponse});

    tick(2000);

    fixture.detectChanges();
    expect(component.clientName).toBe('');
    expect(component.orderedProducts.length).toBe(0);
    expect(component.totalPrice).toBe(0);
  }));

  it('should set alertMessage to "There are no products selected and client name is null." when clientName is empty and orderedProducts array is empty', () => {
    component.clientName = '';
    component.orderedProducts = [ ];
    component.onSendOrderClick();
    
    expect(component.alertMessage).toBe('There are no products selected and client name is null.');
  });

  it('should set alertMessage to "Client name is required" when clientName is empty', () => {
    component.clientName = '';
    component.orderedProducts = [{
      qty: 2,
      product: {
        id: 1,
        name: 'Milk',
        price: 10,
        image: 'img',
        type: 'Breakfast',
        dateEntry: '22-11-2024',
      },
    },];


    component.onSendOrderClick();
    
    expect(component.alertMessage).toBe('Client name is required');
  });

  it('should set alertMessage to "No products selected" when clientName is empty and orderedProducts array is empty', () => {
    component.clientName = 'Mock Client';
    component.orderedProducts = [ ];


    component.onSendOrderClick();
    
    expect(component.alertMessage).toBe('No products selected');
  });

  it('should increase quantity and total price for existing product in orderedProducts array', () => {
    const product = {id:1, price:326} as productInter;
    component.orderedProducts = [{ qty:1, product }];
    component.totalPrice = 326;

    component.onProductClicked(product);
  
    expect(component.orderedProducts.length).toBe(1);
    expect(component.orderedProducts[0].qty).toBe(2);
    expect(component.totalPrice).toBe(652);
  });

  it('should add a new products and increase total price if the clicked product is not an existing product in orderedProducts array', () => {
    const product = {id:1, price:326} as productInter;
    const newProduct = {id:5, price:200} as productInter;

    component.orderedProducts = [{ qty:1, product }];
    component.totalPrice = 326;

    component.onProductClicked(newProduct);
  
    expect(component.orderedProducts.length).toBe(2);
    expect(component.totalPrice).toBe(526);
  });
});
