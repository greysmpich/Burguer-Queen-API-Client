import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../auth.guard';


@NgModule({
  declarations: [
    AuthenticationComponent, 
  ],
  imports: [
    CommonModule,
    FormsModule, 
    HttpClientModule
  ],
  providers: [AuthGuard],
})
export class AuthenticationModule { }
