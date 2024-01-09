import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationServiceService {
  private url_API = 'http://localhost:8080/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const loginUrl = `${this.url_API}`;
    const body = { email, password };
    return this.http.post(loginUrl, body);
  }
}
