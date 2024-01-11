import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationServiceService } from './services/authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationServiceService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      
    const userRole = this.authService.getUserRole();
    console.log('Desde AuthGuard', userRole);
    
    if (userRole) {
      const allowedRoles = route.data['allowedRoles'] as string[];
      console.log('Desde AuthGuard', allowedRoles);
      
      if (allowedRoles && allowedRoles.includes(userRole)) {
        return true;
      }

    }
    this.router.navigate(['/login'])
    return false
  }
}
