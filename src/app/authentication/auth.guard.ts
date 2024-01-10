import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationServiceService } from '../services/authentication-service.service';
import { Auth } from '../shared/interface';
import { Observable, take, pipe, map } from 'rxjs';

//import { AuthenticationComponent } from './authentication.component';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationServiceService, private router: Router) {}
  canActivate(): boolean {
    //let userData: Auth | undefined
    this.authService.userData$.subscribe((result)=> {
   console.log(result, 'ress');
   
    })
   /* return this.authService.userData$
    .pipe(
        take(1),
    map((userDat:object)=> userData)
    )
    console.log(userData);*/
    //return userData
    // if (userData?.accessToken) {
    //   //this.router.navigate(['waiter-orders']);
    //   console.log(' TRUE');
      
    // } else {
    //   //this.router.navigate(['login']);
    //   return false;
    // }
    return true
  }
}
