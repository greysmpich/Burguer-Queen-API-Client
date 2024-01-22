import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SendOrderButtonComponent } from './send-order-button.component';
import { RouterTestingModule } from '@angular/router/testing';
describe('SendOrderButtonComponent', () => {
  let component: SendOrderButtonComponent;
  let fixture: ComponentFixture<SendOrderButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendOrderButtonComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendOrderButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit event on click', fakeAsync(() => {
    let eventEmitted = false;
    component.sendOrder.subscribe(() => {
      eventEmitted = true;
    });
    component.onClick();
    tick();
    expect(eventEmitted).toBe(true);
  }));
});
