import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClientNameInputComponent } from './client-name-input.component';
import { RouterTestingModule } from '@angular/router/testing';
import { OrdersService
 } from 'src/app/services/orders/orders.service';
describe('ClientNameInputComponent', () => {
  let component: ClientNameInputComponent;
  let fixture: ComponentFixture<ClientNameInputComponent>;
  let ordersService: OrdersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientNameInputComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientNameInputComponent);
    component = fixture.componentInstance;
    ordersService = TestBed.inject(OrdersService) as jasmine.SpyObj<OrdersService>; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update client name in service', () => {
   
    const clientName = 'Client1'
  
    const ordersServiceSpy = spyOn(ordersService, 'setClientName');

    component.updateClientNameinService(clientName);

    expect(ordersServiceSpy).toHaveBeenCalledWith(clientName);
  });
});
