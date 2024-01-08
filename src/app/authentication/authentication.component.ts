import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor() { }

  mostrarContrasena: boolean = false;
  eyeImageSource: string = '../../assets/images/hide.png';
  ngOnInit(): void {
  }

  passwordVisibility() {
  this.mostrarContrasena = !this.mostrarContrasena;
  this.eyeImageSource = this.mostrarContrasena ? '../../assets/images/show.png' : '../../assets/images/hide.png';
 
  }

}
