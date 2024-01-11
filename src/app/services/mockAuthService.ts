import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
//import { AuthenticationServiceService } from './authentication-service.service'; //

export class MockAuthService {
  //constructor(private router: Router) {}
    login(email: string, password: string): Observable<any> {
      if (email === 'correcto@example.com' && password === 'contraseñaCorrecta') {
        return of({ accessToken: 'token', user: {email: 'correcto@example.com', role: 'user', id: 1} });
      } else {
        return throwError(() => { 'Credenciales incorrectas' });
      }
    }
    
  // setUserRole(userInfo: any) {
  //   if(userInfo === 'user')
  //   localStorage.setItem('user', JSON.stringify(userInfo));
  // }

  // getUserRole() {   
  //   return JSON.parse(localStorage.getItem('user') || '{}')
  // }

  // redirectToRoleSpecificScreen() {
  //   const userRole = this.getUserRole();
  //   if(userRole === 'user') {
  //     this.router.navigate(['/waiter'])
  //   }
  // }

  // clearUserRole() {
  //   localStorage.removeItem('user');
  // }
  }