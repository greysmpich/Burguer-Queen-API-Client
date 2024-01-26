import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersDeliveredComponent } from './orders-delivered.component';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('OrdersDeliveredComponent', () => {
  let component: OrdersDeliveredComponent;
  let fixture: ComponentFixture<OrdersDeliveredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersDeliveredComponent ],
      providers: [OrdersService],
      imports: [HttpClientTestingModule,RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersDeliveredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
