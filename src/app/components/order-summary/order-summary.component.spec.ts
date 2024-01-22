import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderSummaryComponent } from './order-summary.component';
import { RouterTestingModule } from '@angular/router/testing';
import { OrdersService } from 'src/app/services/orders/orders.service';
//import { of } from 'rxjs';
import { Order } from 'src/app/shared/interfaces/order';
describe('OrderSummaryComponent', () => {
  let component: OrderSummaryComponent;
  let fixture: ComponentFixture<OrderSummaryComponent>;
  let orderService: OrdersService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderSummaryComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [OrdersService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSummaryComponent);
    component = fixture.componentInstance;
    orderService = TestBed.inject(OrdersService);
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

  it('should submit an order successfully and reset the values', fakeAsync(() => {
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
    const req = httpTestingController.expectOne(expectedUrl); 
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(jasmine.objectContaining({
      client: 'Cliente de prueba',
          products: component.orderedProducts,
          status: 'Pending',
          dataEntry: new Date(),
          id: 0,
          total: 20,
    }));
    const orden: Order = {
          client: 'Cliente de prueba',
          products: component.orderedProducts,
          status: 'Pending',
          dataEntry: new Date(),
          id: 0,
          total: 20,
        };
    // Simular una respuesta exitosa del servidor
    req.flush({orden});

    // Esperar a que se resuelva la promesa de la suscripción
    tick();
    expect(component.clientName).toBe('');
    expect(component.orderedProducts.length).toBe(0);
    expect(component.totalPrice).toBe(0);
  }));
});
