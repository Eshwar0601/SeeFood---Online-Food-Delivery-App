import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { AddRestaurantComponent } from '../add-restaurant/add-restaurant.component';
import { OrderService } from '../services/order.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-admin-restaurant',
  templateUrl: './admin-restaurant.component.html',
  styleUrls: ['./admin-restaurant.component.css'],
})
export class AdminRestaurantComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    public userService: UserServiceService,
    private orderService: OrderService
  ) {}

  restaurants: any;
  token: any = localStorage.getItem('auth-token');
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'auth-token': this.token,
  });

  getRestaurantsOfThisUser() {
    this.http
      .get(`http://127.0.0.1:8080/api/restaurant`, {
        headers: this.httpHeaders,
      })
      .subscribe(
        (data) => {
          console.log('data fetched =>', data);
          this.restaurants = JSON.parse(JSON.stringify(data)).restaurants;
        },
        (err) => {
          console.log('error while fetching data');
          throw err;
        }
      );
  }

  ngOnInit(): void {
    this.orderService.getCartItemsOfUser();
    this.getRestaurantsOfThisUser();
  }
  openAddRestaurantDialogue() {
    this.orderService.getCartItemsOfUser();
    this.dialog.open(AddRestaurantComponent);
  }
  openAddProductsDialogue(id: any) {
    this.orderService.getCartItemsOfUser();
    this.userService.restaurentId = id;
    this.dialog.open(AddProductComponent);
  }
}
