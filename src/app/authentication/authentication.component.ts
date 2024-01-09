import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../services/authentication-service.service';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  constructor(private authService:AuthenticationServiceService) { }

  mostrarContrasena: boolean = false;
  eyeImageSource: string = '../../assets/images/hide.png';
  userData: string = ''
  email: string = '';
  password: string = '';

  ngOnInit(): void {
  }

serviceLogin():void {
  this.authService.login(this.email, this.password).subscribe(
    (data) => {
    this.userData = data;
    console.log('Datos del usuario:', data, ' next')}
  );
}
  passwordVisibility() {
  this.mostrarContrasena = !this.mostrarContrasena;
  this.eyeImageSource = this.mostrarContrasena ? '../../assets/images/show.png' : '../../assets/images/hide.png';
}

}
