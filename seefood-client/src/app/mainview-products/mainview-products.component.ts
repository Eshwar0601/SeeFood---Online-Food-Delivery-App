import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddtocartComponent } from '../addtocart/addtocart.component';
import { OrderService } from '../services/order.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-mainview-products',
  templateUrl: './mainview-products.component.html',
  styleUrls: ['./mainview-products.component.css'],
})
export class MainviewProductsComponent implements OnInit {
  products: any;
  token: any = localStorage.getItem('auth-token');
  quantity: number = 0;
  cartItems: any;
  // canAddQuantity: boolean = false;
  // httpHeaders = new HttpHeaders({
  //   'Content-Type': 'application/json; charset=utf-8',
  //   'auth-token': this.token,
  // });
  constructor(
    private dialog: MatDialog,
    private userService: UserServiceService,
    private http: HttpClient,
    public router: Router,
    public orderService: OrderService
  ) {}

  getProducts() {
    this.orderService.getCartItemsOfUser();
    this.http
      .get(
        `http://127.0.0.1:8080/api/product/restaurant/${this.userService.restaurentId}`
      )
      .subscribe(
        (data) => {
          console.log('data fetched =>', data);
          this.products = JSON.parse(JSON.stringify(data)).products;
        },
        (err) => {
          console.log('error', err);
        }
      );
  }

  ngOnInit(): void {
    this.orderService.getCartItemsOfUser();
    this.getProducts();
  }

  openAddToCartModal(product: any) {
    this.orderService.getCartItemsOfUser();
    this.orderService.product = product;
    this.dialog.open(AddtocartComponent);
  }
}
