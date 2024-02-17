import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { WaiterComponent } from './views/waiter/waiter.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ProductsComponent } from './components/products/products.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LogoutModalComponent } from './components/logout-modal/logout-modal.component';
import { ClientNameInputComponent } from './components/client-name-input/client-name-input.component';
import { KitchenComponent } from './views/kitchen/kitchen.component';
import { FormsModule } from '@angular/forms';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ButtonDoneKitchenComponent } from './components/button-done-kitchen/button-done-kitchen.component';
import { WaiterOrderStatusComponent } from './views/waiter-order-status/waiter-order-status.component';
import { OrdersPendingDeliveringComponent } from './components/orders-pending-delivering/orders-pending-delivering.component';
import { OrdersDeliveredComponent } from './components/orders-delivered/orders-delivered.component';
import { ButtonBackComponent } from './components/button-back/button-back.component';
import { ModalOrderNotReadyComponent } from './components/modal-order-not-ready/modal-order-not-ready.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';

@NgModule({
  declarations: [
    AppComponent,
    WaiterComponent,
    LogoutComponent,
    HeaderComponent,
    ProductsComponent,
    OrderSummaryComponent,
    LogoutModalComponent,
    ClientNameInputComponent,
    KitchenComponent,
    OrdersComponent,
    OrderDetailsComponent,
    ButtonDoneKitchenComponent,
    WaiterOrderStatusComponent,
    OrdersPendingDeliveringComponent,
    OrdersDeliveredComponent,
    ButtonBackComponent,
    ModalOrderNotReadyComponent,
    CustomButtonComponent,
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
