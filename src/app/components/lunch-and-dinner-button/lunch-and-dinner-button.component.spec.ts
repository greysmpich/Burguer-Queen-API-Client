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
  
  it('should emit the selected event when select is called', () => {
    const emitSpy = spyOn(component.selected, 'emit');
    component.select();
    expect(emitSpy).toHaveBeenCalled();
  });
});
