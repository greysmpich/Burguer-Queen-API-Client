import { NgModule } from '@angular/core';
//import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
//import { NgModel } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AuthenticationComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    HttpClientModule
  ]
})
export class AuthenticationModule { }
