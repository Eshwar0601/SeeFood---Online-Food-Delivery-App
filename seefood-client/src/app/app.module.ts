import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { MainviewComponent } from './mainview/mainview.component';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRestaurantComponent } from './admin-restaurant/admin-restaurant.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { MatTableModule } from '@angular/material/table';
import { AddProductComponent } from './add-product/add-product.component';
import { MainviewProductsComponent } from './mainview-products/mainview-products.component';
import { AddtocartComponent } from './addtocart/addtocart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MainviewComponent,
    AddRestaurantComponent,
    PageNotFoundComponent,
    DashboardComponent,
    AdminRestaurantComponent,
    AdminProductComponent,
    AddProductComponent,
    MainviewProductsComponent,
    AddtocartComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    OrdersComponent,
  ],
  entryComponents: [LoginComponent, RegisterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    NgbModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    FontAwesomeModule,
    MatListModule,
    MatDividerModule,
    MaterialFileInputModule,
    ToastrModule.forRoot(),
    LayoutModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
