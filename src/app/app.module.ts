import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductComponent } from './components/admin-product/admin-product.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { FaModule } from './fa/fa.module';
import { effects, reducers } from './store/app.store';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
    ProductsComponent,
    CategoriesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'e-shop'),
    AngularFirestoreModule,
    NgbModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    FaModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
