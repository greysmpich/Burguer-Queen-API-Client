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

  private URL_PRODUCTS = 'https://burguer-queen-api-bqac1.onrender.com/products';
  breakfastMenu: productInter[] = [];
  lunchAndDinnerMenu: productInter[] = [];
  currentMenu: productInter[] = [];

  getProducts(): Observable<productInter[]>{
   const token = this.authService.getToken()
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      });
    return this.http.get<productInter[]>(`${this.URL_PRODUCTS}`, {headers})
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
  
}
