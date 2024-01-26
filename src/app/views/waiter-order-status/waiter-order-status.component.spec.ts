import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { WaiterOrderStatusComponent } from './waiter-order-status.component';
import { Router } from '@angular/router';

describe('WaiterOrderStatusComponent', () => {
  let component: WaiterOrderStatusComponent;
  let fixture: ComponentFixture<WaiterOrderStatusComponent>;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaiterOrderStatusComponent ],
      imports: [HttpClientModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaiterOrderStatusComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should back to menu', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    component.backToMenu()
    expect(navigateSpy).toHaveBeenCalled();
  });

});
