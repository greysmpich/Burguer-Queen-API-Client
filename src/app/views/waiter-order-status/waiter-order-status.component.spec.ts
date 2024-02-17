import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { WaiterOrderStatusComponent } from './waiter-order-status.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { ButtonBackComponent } from 'src/app/components/button-back/button-back.component';
import { CustomButtonComponent } from 'src/app/components/custom-button/custom-button.component';
import { OrdersPendingDeliveringComponent } from 'src/app/components/orders-pending-delivering/orders-pending-delivering.component';
import { OrdersDeliveredComponent } from 'src/app/components/orders-delivered/orders-delivered.component';
import { LogoutComponent } from 'src/app/components/logout/logout.component';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';

describe('WaiterOrderStatusComponent', () => {
  let component: WaiterOrderStatusComponent;
  let fixture: ComponentFixture<WaiterOrderStatusComponent>;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaiterOrderStatusComponent,HeaderComponent, ButtonBackComponent, OrdersPendingDeliveringComponent, OrdersDeliveredComponent, LogoutComponent, CustomButtonComponent ],
      imports: [HttpClientModule, RouterTestingModule,MatDialogModule]
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
