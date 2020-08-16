import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminOrdersComponent } from './views/admin-orders/admin-orders.component';
import { AdminProductComponent } from './views/admin-product/admin-product.component';
import { AdminProductsComponent } from './views/admin-products/admin-products.component';
import { CheckOutComponent } from './views/check-out/check-out.component';
import { ConfirmationDialogComponent } from './views/confirmation-dialog/confirmation-dialog.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { MyOrdersComponent } from './views/my-orders/my-orders.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { OrderSuccessComponent } from './views/order-success/order-success.component';
import { ProductsComponent } from './views/products/products.component';
import { ShoppingCartComponent } from './views/shopping-cart/shopping-cart.component';
import { ProductCardComponent } from './views/product-card/product-card.component';
import { ProductQuantityComponent } from './views/product-quantity/product-quantity.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    NavbarComponent,
    AdminProductComponent,
    ConfirmationDialogComponent,
    ProductCardComponent,
    ProductQuantityComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'e-shop'),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
