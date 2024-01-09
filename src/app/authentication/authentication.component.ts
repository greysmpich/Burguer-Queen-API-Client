import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../services/authentication-service.service';
import { Auth } from '../shared/interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  constructor(private authService:AuthenticationServiceService) { }

  mostrarContrasena: boolean = false;
  eyeImageSource: string = '../../assets/images/hide.png';
  userData: Auth | undefined;
  email: string = '';
  password: string = '';

  ngOnInit(): void {
  }

serviceLogin():void {
  this.authService.login(this.email, this.password).subscribe(
    (data) => {
    this.userData = data;   
    console.log('Datos del usuario:', this.userData);
    Swal.fire({
      icon: 'success',
      title: 'Inicio de sesión exitoso',
      customClass: {
        popup: 'custom-swal',
      },
      showConfirmButton: false,
      timer: 1500
    })
  },
  (error) => {
    console.log('Crednciales incorrectas', error);
    Swal.fire({
      icon: 'warning',
      title: 'Error de inicio de sesión',
      text: 'Revisa tu correo y contraseña e inténtalo de nuevo',   
      customClass: {
        popup: 'custom-swal',
      },
      confirmButtonColor: '#018FC7'
    })
  }
  );
}

  passwordVisibility() {
  this.mostrarContrasena = !this.mostrarContrasena;
  this.eyeImageSource = this.mostrarContrasena ? '../../assets/images/show.png' : '../../assets/images/hide.png';
}

}
