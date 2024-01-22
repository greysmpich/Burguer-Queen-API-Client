import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { OrdersService } from './orders.service';
import { RouterTestingModule } from '@angular/router/testing';
import { productInter } from 'src/app/shared/interfaces/product';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

const mockProducts: productInter[] = [
  { id: 1, name:'Product 1', price:1, image:'img', type: 'Breakfast', dateEntry: '2022-03-05 15:14:10' },
  { id: 2, name:'Product 2', price:2, image:'img', type: 'Lunch', dateEntry: '2022-03-05 15:14:10' },
 { id: 3, name:'Product 3', price:3, image:'img', type: 'Lunch', dateEntry: '2022-03-05 15:14:10' },
  { id: 4, name:'Product 4', price:4, image:'img', type: 'Sides', dateEntry: '2022-03-05 15:14:10' },
  { id: 5, name:'Product 5', price:5, image:'img', type: 'Breakfast', dateEntry: '2022-03-05 15:14:10' },
  { id: 6, name:'Product 6', price:6, image:'img', type: 'Dinner', dateEntry: '2022-03-05 15:14:10' },
  { id: 7, name:'Product 7', price:7, image:'img', type: 'Lunch', dateEntry: '2022-03-05 15:14:10' }
];

describe('OrderService', () => {
  let service: OrdersService ;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, HttpClientTestingModule], 
      providers: [OrdersService]});
    service = TestBed.inject(OrdersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should get products', () => {
  service.getProducts().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });
    const req = httpTestingController.expectOne('https://api-burguer-queen-bqac1.onrender.com/products');
    expect(req.request.method).toEqual('GET');
    req.flush(mockProducts);
  });
  
  it('should filter breakfast menu correctly', () => {
    const filteredBreakfastMenu = service.filterBreakfastMenu(mockProducts);
    expect(filteredBreakfastMenu.length).toEqual(2);
    expect(filteredBreakfastMenu).toContain(mockProducts[0]);
    expect(filteredBreakfastMenu).toContain(mockProducts[4]);
  });

  it('should filter lunch and dinner menu correctly', () => {
    const filteredBreakfastMenu = service.filterLunchAndDinnerMenu(mockProducts);
    expect(filteredBreakfastMenu.length).toEqual(5);
    expect(filteredBreakfastMenu).toContain(mockProducts[1]); 
    expect(filteredBreakfastMenu).toContain(mockProducts[5]);
    expect(filteredBreakfastMenu).toContain(mockProducts[6]);
    expect(filteredBreakfastMenu).toContain(mockProducts[2]);
    expect(filteredBreakfastMenu).toContain(mockProducts[3]);
  });

  it('should return the original URL if HEAD request is successful', () => {
    const mockUrl = 'http://example.com/image.jpg';
    const mockFallbackUrl = 'http://example.com/fallback.jpg';

    service.getImageUrl(mockUrl, mockFallbackUrl).subscribe(result => {
      expect(result).toEqual(mockUrl);
    });
    
    const req = httpTestingController.expectOne(mockUrl);
    req.flush({}, { status: 200, statusText: 'OK' });

  });

  it('should return the fallback URL if HEAD request fails', () => {
    const mockUrl = 'http://example.com/image.jpg';
    const mockFallbackUrl = 'http://example.com/fallback.jpg';
    service.getImageUrl(mockUrl, mockFallbackUrl).subscribe(result => {
      expect(result).toEqual(mockFallbackUrl);
    });
    const req = httpTestingController.expectOne(mockUrl);
    req.error(new ErrorEvent('Network error'), { status: 404, statusText: 'Not Found' });
  });
  it('should delete an order correctly', fakeAsync(() => {
    const orderIdToDelete = 123;
    service.deleteOrders(orderIdToDelete).subscribe(() => {});
    const expectedUrl = `https://api-burguer-queen-bqac1.onrender.com/orders/${orderIdToDelete}`; 
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('DELETE');
    req.flush(null);
    tick();
  }));
  it('debería actualizar el producto clickeado correctamente', () => {
    service.setClickedProduct(mockProducts[0]);

    let clickedProduct: any;
    service.getClickedProduct().subscribe(product => {
      clickedProduct = product;
    });

    expect(clickedProduct).toEqual(mockProducts[0]);
  });
});

