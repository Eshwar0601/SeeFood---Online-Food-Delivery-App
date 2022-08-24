import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}
  quantity: number = 0;
  product: any;
  cartItems: any;
  cartItemsArr: any = [];
  cartItemsLength: number = 0;
  token: any = localStorage.getItem('auth-token');
  total: number = 0;
  orderId: string = '6304860ed639a079df242099';
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'auth-token': this.token,
  });

  getCartItemsOfUser() {
    this.total = 0;
    this.http
      .get('http://127.0.0.1:8080/api/cartitem', { headers: this.httpHeaders })
      .subscribe(
        (data) => {
          this.cartItems = JSON.parse(JSON.stringify(data)).cart_items;
          this.cartItemsLength = Object.keys(this.cartItems).length;
          this.calculateCartTotal();
        },
        (error) => {
          console.log('error');
        }
      );
  }

  calculateCartTotal() {
    if (this.cartItemsLength > 0) {
      this.cartItems.map((data: any) => {
        this.cartItemsArr.push(data._id);
        this.total += data.cartItemsTotal;
      });
    }
  }
}
