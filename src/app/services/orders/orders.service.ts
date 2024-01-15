import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationServiceService } from '../authentication/authentication-service.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private authService: AuthenticationServiceService, private http: HttpClient) { }

  private URL_PRODUCTS = 'http://localhost:8080/products'
  getProducts(): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.accessToken}`,
      });
    return this.http.get<any>(`${this.URL_PRODUCTS}`, {headers})
  }

  getImageUrl(url: string, fallbackUrl: string): Observable<string> {
    return this.http.head(url, { observe: 'response' }).pipe(
      map(response => (response.status === 200 ? url : fallbackUrl)),
      catchError(() => of(fallbackUrl))
    );
  }
  
}
