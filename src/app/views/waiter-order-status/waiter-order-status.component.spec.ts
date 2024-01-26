import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaiterOrderStatusComponent } from './waiter-order-status.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { ButtonBackComponent } from 'src/app/components/button-back/button-back.component';
import { OrdersPendingDeliveringComponent } from 'src/app/components/orders-pending-delivering/orders-pending-delivering.component';
import { OrdersDeliveredComponent } from 'src/app/components/orders-delivered/orders-delivered.component';
import { LogoutComponent } from 'src/app/components/logout/logout.component';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { AuthenticationServiceService } from 'src/app/services/authentication/authentication-service.service';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('WaiterOrderStatusComponent', () => {
  let component: WaiterOrderStatusComponent;
  let fixture: ComponentFixture<WaiterOrderStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WaiterOrderStatusComponent, HeaderComponent, ButtonBackComponent, OrdersPendingDeliveringComponent, OrdersDeliveredComponent, LogoutComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, MatDialogModule],
      providers: [OrdersService,AuthenticationServiceService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaiterOrderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
