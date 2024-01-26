import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WaiterComponent } from './waiter.component';
import { RouterTestingModule } from '@angular/router/testing';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { of } from 'rxjs';
import { mockProducts, mockBreakfastMenu, mockLunchAndDinnerMenu } from './mockMenus';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { BreakfastButtonComponent } from 'src/app/components/breakfast-button/breakfast-button.component';
import { LunchAndDinnerButtonComponent } from 'src/app/components/lunch-and-dinner-button/lunch-and-dinner-button.component';
import { ClientNameInputComponent } from 'src/app/components/client-name-input/client-name-input.component';
import { ProductsComponent } from 'src/app/components/products/products.component';
import { OrderSummaryComponent } from 'src/app/components/order-summary/order-summary.component';
import { LogoutComponent } from 'src/app/components/logout/logout.component';
import { SendOrderButtonComponent } from 'src/app/components/send-order-button/send-order-button.component';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';

describe('WaiterComponent', () => {
  let component: WaiterComponent;
  let fixture: ComponentFixture<WaiterComponent>;
  let ordersService: OrdersService;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WaiterComponent, HeaderComponent, BreakfastButtonComponent, LunchAndDinnerButtonComponent, OrderSummaryComponent, LogoutComponent, ProductsComponent, ClientNameInputComponent, SendOrderButtonComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, MatDialogModule],
      providers: [OrdersService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaiterComponent);
    component = fixture.componentInstance;
    ordersService = TestBed.inject(OrdersService);
    router = TestBed.inject(Router);
    spyOn(ordersService, 'getProducts').and.returnValue(of(mockProducts));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProducts() and filterMenus() on ngOnInit', () => {
    expect(ordersService.getProducts).toHaveBeenCalled();
  });

  it('should set productsList and update images in a successful getProducts', () => {
    const imageUrlData = 'http://ejemplo.com/imagen.jpg';

    spyOn(ordersService, 'getImageUrl').and.returnValue(of(imageUrlData));

    component.ngOnInit();

    expect(component.productsList.length).toBe(7);
    component.productsList.forEach(product => {
      expect(ordersService.getImageUrl).toHaveBeenCalled();
      expect(product.image).toBe(imageUrlData);
    });
  });

  it('should filter breakfast menu and set currentMenu to breakfast', () => {
    const filterBreakfastMenuSpy = spyOn(ordersService, 'filterBreakfastMenu');
    const expectedBreakfastMenu = mockBreakfastMenu;
    filterBreakfastMenuSpy.and.returnValue(expectedBreakfastMenu);

    component.filterMenus();

    expect(component.breakfastMenu).toEqual(expectedBreakfastMenu);
    expect(filterBreakfastMenuSpy).toHaveBeenCalled();
  });

  it('should filter lunch and dinner menu and set currentMenu to lunch and dinner menu', () => {
    const filterLunchAndDinnerMenuSpy = spyOn(ordersService, 'filterLunchAndDinnerMenu');
    const expectedLunchAndDinnerMenuMenu = mockLunchAndDinnerMenu;
    filterLunchAndDinnerMenuSpy.and.returnValue(expectedLunchAndDinnerMenuMenu);

    component.filterMenus();

    expect(component.lunchAndDinnerMenu).toEqual(expectedLunchAndDinnerMenuMenu);
    expect(filterLunchAndDinnerMenuSpy).toHaveBeenCalled();
  });

  it('should show breakfast menu when isBreakfastSelected is true', () => {
    component.isBreakfastSelected = true;
    component.breakfastMenu = [
      { id: 1, name: 'Product 1', price: 1, image: 'img', type: 'Breakfast', dateEntry: '2022-03-05 15:14:10' },
      { id: 5, name: 'Product 5', price: 5, image: 'img', type: 'Breakfast', dateEntry: '2022-03-05 15:14:10' },
    ];

    component.showBreakfastMenu();
    expect(component.currentMenu).toEqual(component.breakfastMenu);
  });

  it('should set isBreakfastSelected to true and isLunchAndDinnerSelected to false on handleBreakfastSelection', () => {
    component.isBreakfastSelected = false;
    component.isLunchAndDinnerSelected = true;

    component.handleBreakfastSelection();

    expect(component.isBreakfastSelected).toBe(true);
    expect(component.isLunchAndDinnerSelected).toBe(false);
    expect(component.currentMenu).toEqual(component.breakfastMenu);
  });

  it('should handeled lunch and dinner selection', () => {
    const showLuncAhdnDinnerMenuSpy = spyOn(component, 'showLunchAndDinnerMenu');
    component.handleLunchAndDinnerSelection();

    expect(component.isLunchAndDinnerSelected).toBeTruthy();
    expect(component.isBreakfastSelected).toBeFalsy();
    expect(showLuncAhdnDinnerMenuSpy).toHaveBeenCalled();
  });

  it('should update currentMenu based on lunch and dinner selection', () => {

    component.isLunchAndDinnerSelected = true;
    component.lunchAndDinnerMenu = mockLunchAndDinnerMenu;

    component.showLunchAndDinnerMenu();

    expect(component.currentMenu).toEqual(component.lunchAndDinnerMenu);
  });

  it('should show breakfast menu if lunch and dinner selection is false', () => {

    component.isLunchAndDinnerSelected = false;
    component.breakfastMenu = mockBreakfastMenu;

    component.showLunchAndDinnerMenu();

    expect(component.currentMenu).toEqual(component.breakfastMenu);
  });

  it('should navigate to orders view', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    component.viewOrdersStatus();
    expect(navigateSpy).toHaveBeenCalled();
  });

});
