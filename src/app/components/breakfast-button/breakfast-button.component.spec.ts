import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreakfastButtonComponent } from './breakfast-button.component';

describe('BreakfastButtonComponent', () => {
  let component: BreakfastButtonComponent;
  let fixture: ComponentFixture<BreakfastButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreakfastButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakfastButtonComponent);
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
