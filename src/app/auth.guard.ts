import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthenticationServiceService } from './services/authentication/authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationServiceService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot): boolean {
      
    const userRole = this.authService.getUserRole();
     
    if (userRole) {
      const allowedRoles = route.data['allowedRoles'] as string[];
      if (allowedRoles && allowedRoles.includes(userRole)) {
        return true;
      }
    }
    this.router.navigate(['/login'])
    return false
  }
}
