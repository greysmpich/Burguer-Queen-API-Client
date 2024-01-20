import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationServiceService } from '../authentication/authentication-service.service';
import { map, catchError } from 'rxjs/operators';
import { productInter } from 'src/app/shared/interfaces/product';
import { Order } from 'src/app/shared/interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private authService: AuthenticationServiceService, private http: HttpClient) { }

  private URL_PRODUCTS = 'https://api-burguer-queen-bqac1.onrender.com/products';
  private URL_ORDERS = 'https://api-burguer-queen-bqac1.onrender.com/orders';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.authService.getToken()}`
  })

  private clickedProductSubject = new BehaviorSubject<productInter | null>(null);
  private clientNameSource = new BehaviorSubject<string>('');
  
//   clearInputSubject: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);

  breakfastMenu: productInter[] = [];
  lunchAndDinnerMenu: productInter[] = [];
  currentMenu: productInter[] = [];

  getProducts(): Observable<productInter[]>{
    return this.http.get<productInter[]>(`${this.URL_PRODUCTS}`, {headers: this.headers})
  }

  filterBreakfastMenu(products: productInter[]): productInter[] {
    const breakfastBeverages = [1, 5];
    return products.filter(product => product.type === 'Breakfast' || breakfastBeverages.includes(product.id));
  }
  filterLunchAndDinnerMenu(products: productInter[]): productInter[] {
    const lunchBeverages = [2, 6, 7];
    return products.filter(product => product.type === 'Lunch' || product.type === 'Sides' || lunchBeverages.includes(product.id));
  }

  getImageUrl(url: string, fallbackUrl: string): Observable<string> {
    return this.http.head(url, { observe: 'response' }).pipe(
      map(response => (response.status === 200 ? url : fallbackUrl)),
      catchError(() => of(fallbackUrl))
    );
  }

  postOrder(order: object): Observable<Order>{
     return this.http.post<Order>(this.URL_ORDERS, order, {headers: this.headers})
   }
  
   setClickedProduct(product: productInter): void {
    this.clickedProductSubject.next(product);
  }

  getClickedProduct(): Observable<productInter | null> {
    return this.clickedProductSubject.asObservable();
  }

  setClientName(value: string): void{
    this.clientNameSource.next(value);
  }

  getClientName(): Observable<string | ''> {
    return this.clientNameSource.asObservable();
  }

  getOrders(): Observable<Order[]>{
      return this.http.get<Order[]>(`${this.URL_ORDERS}`, {headers: this.headers})
    }

  deletOrders(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.URL_ORDERS}/${orderId}`, { headers: this.headers })
  }
  
  // clearInput() {
  //   this.clearInputSubject.next();
  //   console.log('limpio');
    
  // }


}
