import { Observable, of, throwError } from 'rxjs';
//import { AuthenticationServiceService } from './authentication-service.service'; //

export class MockAuthService {
    login(email: string, password: string): Observable<any> {
      if (email === 'correcto@example.com' && password === 'contraseñaCorrecta') {
        return of({ accessToken: 'token', user: {email: 'correcto@example.com', role: 'user', id: 1} });
      } else {
        return throwError(() => { 'Credenciales incorrectas' });
      }
    }
  }