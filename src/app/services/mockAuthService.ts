import { Observable, of, throwError } from 'rxjs';

export class MockAuthService {
    // Simula la función de inicio de sesión devolviendo un observable con datos simulados
    login(email: string, password: string): Observable<any> {
      // Puedes personalizar esto para simular diferentes escenarios de inicio de sesión
      if (email === 'correcto@example.com' && password === 'contraseñaCorrecta') {
        // Devuelve un observable con datos simulados de usuario autenticado
        return of({ accessToken: 'token', user: { role: 'user' } });
      } else {
        // Devuelve un observable con un error simulado
        return throwError(() => { 'Credenciales incorrectas' });
      }
    }
  }