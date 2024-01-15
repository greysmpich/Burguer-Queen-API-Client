import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WaiterComponent } from './waiter.component';
import { RouterTestingModule } from '@angular/router/testing';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { of } from 'rxjs';

const mockProducts = [
  { id: 1, name:'Product 1', price:1, image:'img', type: 'Breakfast', dateEntry: '2022-03-05 15:14:10' },
  { id: 2, name:'Product 2', price:2, image:'img', type: 'Lunch', dateEntry: '2022-03-05 15:14:10' },
 { id: 3, name:'Product 3', price:3, image:'img', type: 'Lunch', dateEntry: '2022-03-05 15:14:10' },
  { id: 4, name:'Product 4', price:4, image:'img', type: 'Sides', dateEntry: '2022-03-05 15:14:10' },
  { id: 5, name:'Product 5', price:5, image:'img', type: 'Breakfast', dateEntry: '2022-03-05 15:14:10' },
  { id: 6, name:'Product 6', price:6, image:'img', type: 'Dinner', dateEntry: '2022-03-05 15:14:10' },
  { id: 7, name:'Product 7', price:7, image:'img', type: 'Lunch', dateEntry: '2022-03-05 15:14:10' }
];


describe('WaiterComponent', () => {
  let component: WaiterComponent;
  let fixture: ComponentFixture<WaiterComponent>;
  let ordersService: OrdersService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaiterComponent ],  
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [OrdersService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaiterComponent);
    component = fixture.componentInstance;
    ordersService = TestBed.inject(OrdersService);
   // let imageUrlData = 'http://ejemplo.com/imagen.jpg';
    spyOn(ordersService, 'getProducts').and.returnValue(of(mockProducts));
    //spyOn(ordersService, 'getImageUrl').and.returnValue(of(imageUrlData));

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
it('should show breakfast menu when isBreakfastSelected is true', () => {
  component.isBreakfastSelected = true;
  component.breakfastMenu = [
    { id: 1, name:'Product 1', price:1, image:'img', type: 'Breakfast', dateEntry: '2022-03-05 15:14:10' },
    { id: 5, name:'Product 5', price:5, image:'img', type: 'Breakfast', dateEntry: '2022-03-05 15:14:10' },
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
});
