import { Injectable } from '@angular/core';
import { Observable, of, throwError, BehaviorSubject, pipe } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { productInter } from '../shared/interfaces/product';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationServiceService {
  private url_API = 'http://localhost:8080/login';
  private URL_PRODUCTS = 'http://localhost:8080/products'
//  private accessToken = new BehaviorSubject<string | null>(null);
private accessToken: string | undefined = undefined;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    const loginUrl = `${this.url_API}`;
    const body = { email, password };
    return this.http.post(loginUrl, body);
  }

  getProducts(): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`,
      });
    return this.http.get<any>(`${this.URL_PRODUCTS}`, {headers})
  }

  setUserRole(userRole: any) {
    localStorage.setItem('user', JSON.stringify(userRole));
  }

  getUserRole() {   
    return JSON.parse(localStorage.getItem('user') || '{}')
  }

  redirectToRoleSpecificScreen() {
    const userRole = this.getUserRole();
    if(userRole === 'waiter') {
      this.router.navigate(['/waiter'])
    }
  }

  getToken(token : string | undefined) {
    this.accessToken = token;
   return this.accessToken;
  }

  getImageUrl(url: string, fallbackUrl: string): Observable<string> {
    return this.http.head(url, { observe: 'response' }).pipe(
      map(response => (response.status === 200 ? url : fallbackUrl)),
      catchError(() => of(fallbackUrl))
    );
  }
  
  clearUserRole() {
    localStorage.removeItem('user');
  }
}

