import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from 'src/app/services/authentication/authentication-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthenticationServiceService, private router: Router ) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.authService.clearUserRole();
    this.router.navigate(['/login']);
  }
}
