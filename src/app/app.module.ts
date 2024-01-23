import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { WaiterComponent } from './views/waiter/waiter.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { BreakfastButtonComponent } from './components/breakfast-button/breakfast-button.component';
import { ProductsComponent } from './components/products/products.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { LunchAndDinnerButtonComponent } from './components/lunch-and-dinner-button/lunch-and-dinner-button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LogoutModalComponent } from './components/logout-modal/logout-modal.component';
import { ClientNameInputComponent } from './components/client-name-input/client-name-input.component';
import { SendOrderButtonComponent } from './components/send-order-button/send-order-button.component';
import { KitchenComponent } from './views/kitchen/kitchen.component';
import { FormsModule } from '@angular/forms';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ButtonDoneKitchenComponent } from './components/button-done-kitchen/button-done-kitchen.component';

@NgModule({
  declarations: [
    AppComponent,
    WaiterComponent,
    LogoutComponent,
    HeaderComponent,
    BreakfastButtonComponent,
    ProductsComponent,
    OrderSummaryComponent,
    LunchAndDinnerButtonComponent,
    LogoutModalComponent,
    ClientNameInputComponent,
    SendOrderButtonComponent,
    KitchenComponent,
    OrdersComponent,
    OrderDetailsComponent,
    ButtonDoneKitchenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule, 
    FormsModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
