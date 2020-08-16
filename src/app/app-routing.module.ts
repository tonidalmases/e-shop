import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminOrdersComponent } from './views/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './views/admin-products/admin-products.component';
import { CheckOutComponent } from './views/check-out/check-out.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { OrderSuccessComponent } from './views/order-success/order-success.component';
import { ProductsComponent } from './views/products/products.component';
import { ShoppingCartComponent } from './views/shopping-cart/shopping-cart.component';
import { MyOrdersComponent } from './views/my-orders/my-orders.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AdminProductComponent } from './views/admin-product/admin-product.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },

  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
  {
    path: 'order-success/:key',
    component: OrderSuccessComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'admin/products/new',
    component: AdminProductComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'admin/products/:key',
    component: AdminProductComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
