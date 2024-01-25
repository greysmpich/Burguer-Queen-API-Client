import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { WaiterComponent } from './views/waiter/waiter.component';
import { AuthGuard } from './auth.guard';
import { KitchenComponent } from './views/kitchen/kitchen.component';
import { WaiterOrderStatusComponent } from './views/waiter-order-status/waiter-order-status.component';

const routes: Routes = [
  {path: 'login', component: AuthenticationComponent},
  {
    path: 'waiter',
    component: WaiterComponent,
    canActivate: [AuthGuard],
   data: 
      { allowedRoles: ['waiter'] } 
  },
  {
    path: 'kitchen',
    component: KitchenComponent,
    canActivate: [AuthGuard],
   data: 
      { allowedRoles: ['chef'] } 
  }, 
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'waiter/orders',
    component: WaiterOrderStatusComponent,
    canActivate: [AuthGuard],
    data: 
      { allowedRoles: ['waiter'] } 

  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
