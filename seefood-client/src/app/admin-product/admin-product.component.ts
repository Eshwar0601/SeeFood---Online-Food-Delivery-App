import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css'],
})
export class AdminProductComponent implements OnInit {
  constructor(private http: HttpClient, private orderService: OrderService) {}
  products: any;
  token: any = localStorage.getItem('auth-token');
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'auth-token': this.token,
  });

  getProductsOfthisUser() {
    this.http
      .get(`http://127.0.0.1:8080/api/product`, {
        headers: this.httpHeaders,
      })
      .subscribe((data) => {
        console.log('data fetched =>', data);
        this.products = JSON.parse(JSON.stringify(data)).products;
      });
  }

  ngOnInit(): void {
    this.orderService.getCartItemsOfUser();
    this.getProductsOfthisUser();
  }
}
