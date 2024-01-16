import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WaiterComponent } from './waiter.component';
import { RouterTestingModule } from '@angular/router/testing';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { mockBreakfastMenu, mockLunchAndDinnerMenu } from './mockProductList';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { BreakfastButtonComponent } from 'src/app/components/breakfast-button/breakfast-button.component';
import { LunchAndDinnerButtonComponent } from 'src/app/components/lunch-and-dinner-button/lunch-and-dinner-button.component';
import { OrderSummaryComponent } from 'src/app/components/order-summary/order-summary.component';
import { LogoutComponent } from 'src/app/components/logout/logout.component';

describe('WaiterComponent', () => {
  let component: WaiterComponent;
  let fixture: ComponentFixture<WaiterComponent>;
  let ordersService: jasmine.SpyObj<OrdersService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaiterComponent, HeaderComponent, BreakfastButtonComponent, LunchAndDinnerButtonComponent, OrderSummaryComponent, LogoutComponent],  
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ OrdersService ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaiterComponent);
    component = fixture.componentInstance;
    ordersService = TestBed.inject(OrdersService) as jasmine.SpyObj<OrdersService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });







  it('it should filter breakfast menu and set currentMenu ti breakfast', () => {
    const filterBreakfastMenuSpy = spyOn(ordersService, 'filterBreakfastMenu');
    const expectedBreakfastMenu = mockBreakfastMenu;
    filterBreakfastMenuSpy.and.returnValue(expectedBreakfastMenu);
    
    component.filterMenus();
    
    expect(component.breakfastMenu).toEqual(expectedBreakfastMenu);
    expect(filterBreakfastMenuSpy).toHaveBeenCalled();
  });

  it('it should filter lunch and dinner menu and set currentMenu ti lunch and dinner menu', () => {
     const filterLunchAndDinnerMenuSpy = spyOn(ordersService, 'filterLunchAndDinnerMenu');
    const expectedLunchAndDinnerMenuMenu = mockLunchAndDinnerMenu;
    filterLunchAndDinnerMenuSpy.and.returnValue(expectedLunchAndDinnerMenuMenu);
    
    component.filterMenus();

    expect(component.lunchAndDinnerMenu).toEqual(expectedLunchAndDinnerMenuMenu);
    expect(filterLunchAndDinnerMenuSpy).toHaveBeenCalled();
  });

  it('it should handeled lunch and dinner selection', () => {
   const showLuncAhdnDinnerMenuSpy = spyOn(component, 'showLunchAndDinnerMenu');
    component.handleLunchAndDinnerSelection();

    expect(component.isLunchAndDinnerSelected).toBeTruthy();
    expect(component.isBreakfastSelected).toBeFalsy();
    expect(showLuncAhdnDinnerMenuSpy).toHaveBeenCalled();
  });

  it('it should update currentMenu based on lunch and dinner selection', () => {
   
    component.isLunchAndDinnerSelected = true;
    component.lunchAndDinnerMenu = mockLunchAndDinnerMenu;
  
    component.showLunchAndDinnerMenu();
    
    expect(component.currentMenu).toEqual(component.lunchAndDinnerMenu);
  });

  it('it should show breakfast menu if lunch and dinner selection is false', () => {
   
    component.isLunchAndDinnerSelected = false;
    component.breakfastMenu = mockBreakfastMenu;
  
    component.showLunchAndDinnerMenu();
    
    expect(component.currentMenu).toEqual(component.breakfastMenu);
  });
});
