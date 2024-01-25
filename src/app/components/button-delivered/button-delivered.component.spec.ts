import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDeliveredComponent } from './button-delivered.component';

describe('ButtonDeliveredComponent', () => {
  let component: ButtonDeliveredComponent;
  let fixture: ComponentFixture<ButtonDeliveredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonDeliveredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonDeliveredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
