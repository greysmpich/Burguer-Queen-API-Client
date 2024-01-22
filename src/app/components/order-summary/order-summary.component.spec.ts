import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OrderSummaryComponent } from './order-summary.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SendOrderButtonComponent } from '../send-order-button/send-order-button.component';
import { productInter } from 'src/app/shared/interfaces/product';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { of } from 'rxjs';

describe('OrderSummaryComponent', () => {
  let component: OrderSummaryComponent;
  let fixture: ComponentFixture<OrderSummaryComponent>;
  let orderService: OrdersService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSummaryComponent, SendOrderButtonComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [OrdersService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSummaryComponent);
    component = fixture.componentInstance;
    //orderService = jasmine.createSpyObj('OrdersService', ['getClickedProduct']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
