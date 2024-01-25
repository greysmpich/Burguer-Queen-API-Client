import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonOrdersStatusComponent } from './button-orders-status.component';

describe('ButtonOrdersStatusComponent', () => {
  let component: ButtonOrdersStatusComponent;
  let fixture: ComponentFixture<ButtonOrdersStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonOrdersStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonOrdersStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
