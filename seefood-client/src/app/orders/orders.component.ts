import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  constructor(private http: HttpClient, private orderService: OrderService) {}

  orders: any;

  ngOnInit(): void {
    this.getAllOrdersOfThisUser();
  }

  getAllOrdersOfThisUser = () => {
    this.http
      .get('http://127.0.0.1:8080/api/order', {
        headers: this.orderService.httpHeaders,
      })
      .subscribe(
        (data) => {
          this.orders = JSON.parse(JSON.stringify(data)).orders;
          console.log('Orders : ', this.orders);
        },
        (err) => {
          console.log('error', err);
        }
      );
  };
}
