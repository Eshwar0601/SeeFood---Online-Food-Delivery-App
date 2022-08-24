import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminRestaurantComponent } from './admin-restaurant/admin-restaurant.component';
import { AuthguardGuard } from './authguard.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// import { DashboardModule } from './dashboard/dashboard.module';
import { HomeComponent } from './home/home.component';
import { MainviewProductsComponent } from './mainview-products/mainview-products.component';
import { MainviewComponent } from './mainview/mainview.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrdersComponent } from './orders/orders.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'view', component: MainviewComponent, canActivate: [AuthguardGuard] },
  {
    path: 'view/products',
    component: MainviewProductsComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'success',
    component: OrderSuccessComponent,
    canActivate: [AuthguardGuard],
  },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthguardGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'restaurants', component: AdminRestaurantComponent },
      { path: 'products', component: AdminProductComponent },
    ],
    canActivate: [AuthguardGuard],
  },

  { path: '**', component: PageNotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
