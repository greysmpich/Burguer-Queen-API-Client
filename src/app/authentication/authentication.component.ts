import { Component, OnInit  } from '@angular/core';
import { AuthenticationServiceService } from '../services/authentication/authentication-service.service';
import { Auth } from '../shared/interfaces/interface';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit  {

  constructor(private authService: AuthenticationServiceService) {}

  showPassword: boolean = false;
  eyeImageSource: string = '../../assets/images/hide.png';
  email: string = '';
  password: string = '';
  private userData: Auth | undefined;
  userRole: string | undefined;
  errorMessage: string | null = null;
  roleUser: string | undefined = ''
  ngOnInit(): void {
  }

  serviceLogin(): void {
    this.authService.login(this.email, this.password).subscribe(
    {  next: (data) => {
     this.userData = data;
     this.roleUser = this.userData?.user.role
      this.authService.setUserRole(this.roleUser);
      this.authService.redirectToRoleSpecificScreen();
      this.authService.getToken(this.userData?.accessToken)
    },
    error: (error) => {
      this.errorMessage = error.error
    }}
    );
  }
  
  passwordVisibility() {
    this.showPassword = !this.showPassword;
    this.eyeImageSource = this.showPassword
      ? '../../assets/images/show.png'
      : '../../assets/images/hide.png';
  }

}
