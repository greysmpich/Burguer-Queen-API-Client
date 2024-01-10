import { Component, OnInit, Output, EventEmitter, NgZone  } from '@angular/core';
import { AuthenticationServiceService } from '../services/authentication-service.service';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { Auth } from '../shared/interface';
import { Router, CanActivate } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit  {

  constructor(private authService: AuthenticationServiceService,
    private router: Router, private ngZone: NgZone) {}

  mostrarContrasena: boolean = false;
  eyeImageSource: string = '../../assets/images/hide.png';
  email: string = '';
  password: string = '';
  private userData: Auth | undefined;
  userRole: string | undefined;
  errorMessage: string | null = null;
  //private accessToken: string = '';

  ngOnInit(): void {
  }

  //@Output() accessTokenEvent = new EventEmitter<string>()

  serviceLogin(): void {
    this.authService.login(this.email, this.password).subscribe(
    {  next: (data) => {
     this.userData = data;
     this.authService.setAuthenticatedState(this.userData)
      // this.userRole = this.userData?.user.role;
      // console.log('Datos del usuario:', this.userData?.accessToken);

      // if(this.userData?.accessToken === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHN5c3RlcnMueHl6IiwiaWF0IjoxNzA0OTAyODUxLCJleHAiOjE3MDQ5MDY0NTEsInN1YiI6IjEifQ.W1MVQJC2gKd84GQ65h_b_Q5VSrDmgsII9vD4xLtPgpE') {
      //   this.ngZone.run(() => {
      //     this.router.navigate(['waiter-orders']); 
      //   })
      // }else {
      //   console.log('No se cumple la condición para waiter-orders');
      // }
    },
    error: (error) => {
      console.error('Error al obtener datos del usuario:', error);
      this.errorMessage = error.error
    }}
    );
  }



  passwordVisibility() {
    this.mostrarContrasena = !this.mostrarContrasena;
    this.eyeImageSource = this.mostrarContrasena
      ? '../../assets/images/show.png'
      : '../../assets/images/hide.png';
  }

}
