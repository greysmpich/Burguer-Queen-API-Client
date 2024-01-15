import { Injectable } from '@angular/core';
import { Observable, of, throwError, BehaviorSubject, pipe } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { productInter } from '../../shared/interfaces/product';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationServiceService {
  private url_API = 'http://localhost:8080/login';
  
//  private accessToken = new BehaviorSubject<string | null>(null);
 accessToken: string | undefined = undefined;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    const loginUrl = `${this.url_API}`;
    const body = { email, password };
    return this.http.post(loginUrl, body);
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

  clearUserRole() {
    localStorage.removeItem('user');
  }
}

