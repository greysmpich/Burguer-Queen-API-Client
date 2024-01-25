import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersPendingDeliveringComponent } from './orders-pending-delivering.component';

describe('OrdersPendingDeliveringComponent', () => {
  let component: OrdersPendingDeliveringComponent;
  let fixture: ComponentFixture<OrdersPendingDeliveringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersPendingDeliveringComponent ]
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
