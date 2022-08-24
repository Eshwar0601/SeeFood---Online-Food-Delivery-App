import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddRestaurantComponent } from '../add-restaurant/add-restaurant.component';
import { OrderService } from '../services/order.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-mainview',
  templateUrl: './mainview.component.html',
  styleUrls: ['./mainview.component.css'],
})
export class MainviewComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    public userService: UserServiceService,
    private http: HttpClient,
    private router: Router,
    private orderService: OrderService
  ) {}

  userData: any;
  restaurants: any;

  ngOnInit(): void {
    if (this.userService.isLoggedIn) {
      this.orderService.getCartItemsOfUser();
      this.userService.getUserData().subscribe(
        (data) => {
          this.userData = JSON.parse(JSON.stringify(data));
          console.log('User Fetched +> ', this.userData);
          this.userService.isUserAdmin = this.userData.is_owner;
        },
        (err) => {
          console.log('error', err);
        }
      );

      this.http.get(`http://127.0.0.1:8080/api/restaurant/all`).subscribe(
        (data) => {
          this.restaurants = JSON.parse(JSON.stringify(data));
        },
        (err) => {
          console.log('error while fetching restaurents =>', err);
        }
      );
    }
  }

  openAddRestaurantDialogue() {
    this.orderService.getCartItemsOfUser();
    this.dialog.open(AddRestaurantComponent);
  }
  showProductsView(id: number) {
    this.orderService.getCartItemsOfUser();
    this.userService.restaurentId = id;
    this.router.navigate(['view/products']);
  }
}
