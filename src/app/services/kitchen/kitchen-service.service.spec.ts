import { TestBed } from '@angular/core/testing';
import { KitchenServiceService } from './kitchen-service.service';
import { Order } from 'src/app/shared/interfaces/order';
import { productInter } from 'src/app/shared/interfaces/product';

const orderedProduct = { id: 1, name: 'Coffe', price: 15 } as productInter;
const mockOrder = {
  client: 'Lilac',
  products: [{ qty: 1,  product: orderedProduct}] ,
  status: 'Delivering',
  dataEntry: new Date(2024, 2, 4, 13, 33, 0),
  id: 1,
  total: 15,
} as Order

describe('KitchenServiceService', () => {
  let service: KitchenServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KitchenServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set order in Kitchen when setOrderKitchen is called', () => {
    service.setOrderKitchen(mockOrder);

    service.clickedOrder$.subscribe((order) => {
      expect(order).toBe(mockOrder);
    })
  });

  it('should calculate the elapsed time from when the kitchen receives the order until it is completed', () => {

  const mockCurrentTime = new Date(2024, 2, 4, 13, 50, 0)
  const elapsedTime = service.calculateElapsedTime(mockOrder.dataEntry, mockCurrentTime);
  
  expect(elapsedTime).toContain('minutes');
  expect(elapsedTime).toContain('seconds');
  expect(elapsedTime).toEqual('17 minutes 0 seconds.');
  });
});
