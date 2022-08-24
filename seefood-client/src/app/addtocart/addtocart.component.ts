import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../services/notify.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css'],
})
export class AddtocartComponent implements OnInit {
  constructor(
    public orderService: OrderService,
    private http: HttpClient,
    public notify: NotifyService
  ) {}

  quantity: number = 1;
  token: any = localStorage.getItem('auth-token');
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'auth-token': this.token,
  });

  ngOnInit(): void {
    this.orderService.getCartItemsOfUser();
  }

  addQuantity() {
    this.quantity += 1;
  }
  removeQuantity() {
    if (this.quantity > 0) {
      this.quantity -= 1;
    }
  }
  addToCartItem() {
    this.http
      .post(
        `http://127.0.0.1:8080/api/cartitem`,
        {
          product: this.orderService.product._id,
          quantity: this.quantity,
        },
        { headers: this.httpHeaders }
      )
      .subscribe(
        (data) => {
          this.notify.openSnackBar('Item Added to Cart', 'Close');
          this.orderService.getCartItemsOfUser();
        },
        (err) => {
          this.notify.openSnackBar(
            'Could not add this item to your cart',
            'Try Again'
          );
        }
      );
    this.orderService.getCartItemsOfUser();
  }
}
