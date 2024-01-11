import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { WaiterComponent } from './views/waiter/waiter.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ProductsComponent } from './components/products/products.component';



@NgModule({
  declarations: [
    AppComponent,
    WaiterComponent,
    LogoutComponent,
    ProductsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
