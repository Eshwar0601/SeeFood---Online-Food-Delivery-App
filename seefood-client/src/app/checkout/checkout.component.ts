import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifyService } from '../services/notify.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public orderService: OrderService,
    public router: Router,
    public notify: NotifyService
  ) {}

  products: any;

  ngOnInit(): void {
    this.orderService.getCartItemsOfUser();
    // this.cartItems = this.orderService.cartItems;
    // this.getItemDetails();
  }
  removeCartItem(id: number) {
    this.http
      .put(`http://127.0.0.1:8080/api/cartitem/${id}`, {
        is_active: false,
      })
      .subscribe(
        (data) => {
          this.notify.openSnackBar('Item Removed from Cart', 'Close');
          this.orderService.getCartItemsOfUser();
        },
        (err) => {
          this.notify.openSnackBar(
            'Could not remove item from your cart',
            'Try Again'
          );
        }
      );
  }
  placeOrder() {
    this.orderService.getCartItemsOfUser();
    this.http
      .post(
        'http://127.0.0.1:8080/api/order',
        {
          cartItem: this.orderService.cartItemsArr,
        },
        { headers: this.orderService.httpHeaders }
      )
      .subscribe(
        (data) => {
          this.notify.openSnackBar('Order Placed Successfully', 'Close');
          this.orderService.getCartItemsOfUser();
          this.orderService.orderId = JSON.parse(JSON.stringify(data))._id;
          this.router.navigate(['success']);
        },
        (err) => {
          this.notify.openSnackBar('Could not place your order', 'Try Again');
        }
      );
  }
}
