import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { WaiterComponent } from './view/waiter/waiter.component';
import { AuthGuard } from './authentication/auth.guard';

const routes: Routes = [
  {path: 'login', component: AuthenticationComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
 // { path: 'waiter-orders', component: WaiterComponent },
  {
    path: 'waiter-orders',
    component: WaiterComponent,
    canActivate: [AuthGuard]
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }