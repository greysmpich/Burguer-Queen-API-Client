import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthGuard } from './auth.guard';
import { WaiterComponent } from './views/waiter/waiter.component';

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
    component: WaiterComponent,
    canActivate: [AuthGuard],
   data: 
      { allowedRoles: ['kitchen'] } 
  },
      // { path: 'user', component: UserComponent, data: { allowedRoles: ['user'] } },
      // { path: 'unauthorized', component: UnauthorizedComponent },
    
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }