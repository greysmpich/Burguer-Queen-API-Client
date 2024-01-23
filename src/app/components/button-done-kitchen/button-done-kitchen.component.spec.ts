import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDoneKitchenComponent } from './button-done-kitchen.component';

describe('ButtonDoneKitchenComponent', () => {
  let component: ButtonDoneKitchenComponent;
  let fixture: ComponentFixture<ButtonDoneKitchenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonDoneKitchenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonDoneKitchenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
