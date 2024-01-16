import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LunchAndDinnerButtonComponent } from './lunch-and-dinner-button.component';
import { By } from '@angular/platform-browser';

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

  it('should return selected style when isSelected is true', () => {
     component.isSelected = true;
     fixture.detectChanges();

     const buttonElement = fixture.debugElement.query(By.css('.lunchAndDinner')).nativeElement;

     expect(buttonElement.style.backgroundColor).toBe('rgb(238, 106, 9)');
     expect(buttonElement.style.color).toBe('white');
  })

  it('should return selected style when isSelected is false', () => {
    component.isSelected = false;
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('.lunchAndDinner')).nativeElement;

    expect(buttonElement.style.backgroundColor).toBe('rgb(217, 217, 217)');
    expect(buttonElement.style.color).toBe('black');
 })
});
