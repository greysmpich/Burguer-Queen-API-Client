import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from 'src/app/services/authentication/authentication-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutModalComponent } from '../logout-modal/logout-modal.component';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthenticationServiceService, private router: Router, public dialog: MatDialog ) { }

  ngOnInit(): void {
  }

  openLogoutConfirmationModal(): void {
    const dialogRef = this.dialog.open(LogoutModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'Cerrar Sesión') {
        
        this.authService.clearUserRole();
        this.authService.clearToken();
        this.router.navigate(['/login']);
      } 
    });
  }
  
}
