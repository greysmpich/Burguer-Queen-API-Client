import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  private url_API = 'http://localhost:8080/login';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const loginUrl = `${this.url_API}`;
    const body = { username, password };

    
console.log('service ', body);

    return this.http.post(loginUrl, body);
  }

}
