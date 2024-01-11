import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunchAndDinnerButtonComponent } from './lunch-and-dinner-button.component';

describe('LunchAndDinnerButtonComponent', () => {
  let component: LunchAndDinnerButtonComponent;
  let fixture: ComponentFixture<LunchAndDinnerButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LunchAndDinnerButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LunchAndDinnerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
