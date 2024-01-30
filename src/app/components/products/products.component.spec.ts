import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './products.component';
import { RouterTestingModule } from '@angular/router/testing';
import { productInter } from 'src/app/shared/interfaces/product';
import { OrdersService } from 'src/app/services/orders/orders.service';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let ordersService: OrdersService;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent ],
      imports: [HttpClientModule, RouterTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    ordersService = TestBed.inject(OrdersService) as jasmine.SpyObj<OrdersService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should create', () => {
  //   const mockProduct = { id: 1, name: 'Mock Product' } as productInter;
  //   component.product = mockProduct;
  //   expect(component).toBeTruthy();
  // });

  it('should emit an event when myEvent is triggered', () => {
    const mockProduct = { id: 1, name: 'Mock Product' } as productInter;
    component.product = mockProduct;
    
    const ordersServiceSpy = spyOn(ordersService, 'setClickedProduct');

    component.onProductClick();

    expect(ordersServiceSpy).toHaveBeenCalledWith(mockProduct);
  });
});
