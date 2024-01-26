import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersPendingDeliveringComponent } from './orders-pending-delivering.component';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('OrdersPendingDeliveringComponent', () => {
  let component: OrdersPendingDeliveringComponent;
  let fixture: ComponentFixture<OrdersPendingDeliveringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersPendingDeliveringComponent ],
      providers: [OrdersService],
      imports: [HttpClientTestingModule, RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersPendingDeliveringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
