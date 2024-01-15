import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationServiceService } from '../authentication/authentication-service.service';
import { map, catchError } from 'rxjs/operators';
import { productInter } from 'src/app/shared/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private authService: AuthenticationServiceService, private http: HttpClient) { }

  private URL_PRODUCTS = 'http://localhost:8080/products'
  private productsList: productInter[] = [];
  breakfastMenu: productInter[] = [];
  lunchAndDinnerMenu: productInter[] = [];
  currentMenu: productInter[] = [];

  getProducts(): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.accessToken}`,
      });
    return this.http.get<any>(`${this.URL_PRODUCTS}`, {headers})
  }
  
  getProductList(products : productInter[] = []) {
    this.productsList = products;
    console.log(this.productsList, 'lista de productos order service');
    
   return this.productsList;
  }

  
  // filterMenus(): void {
  //   const breakfastBeverages = [1, 5];
  //   const lunchBeverages = [2, 6, 7];

  //   this.breakfastMenu = this.productsList.filter(product => {
  //     return product.type === 'Breakfast' || breakfastBeverages.includes(product.id);
  //   });

  //   this.lunchAndDinnerMenu = this.productsList.filter(product => {
  //     return product.type === 'Lunch' || product.type === 'Sides' || lunchBeverages.includes(product.id);
  //   });

  //   this.currentMenu = this.breakfastMenu;
  // }

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
  
}
