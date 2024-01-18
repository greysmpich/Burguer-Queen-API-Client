import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.css']
})
export class LogoutModalComponent implements OnInit {

  
  constructor(public dialogRef: MatDialogRef<LogoutModalComponent>) {}
  
  cancel(): void {
    this.dialogRef.close('Cancelar');   
  }
  
  confirmLogout(): void {
    this.dialogRef.close('Cerrar Sesión');
  }
  
  ngOnInit(): void {
  }

}
