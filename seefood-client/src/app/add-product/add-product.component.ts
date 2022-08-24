import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../services/notify.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  constructor(
    public userService: UserServiceService,
    public http: HttpClient,
    public notify: NotifyService
  ) {}

  name: string = '';
  price: any = 0;
  productImage: any;
  description: string = '';
  token: any = localStorage.getItem('auth-token');
  httpHeaders = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'auth-token': this.token,
  });
  formData = new FormData();

  ngOnInit(): void {}

  onChange(event: any) {
    this.productImage = event.target.files[0];
  }

  addProducts = () => {
    this.formData.append('restaurant', this.userService.restaurentId);
    this.formData.append('name', this.name);
    this.formData.append('price', this.price);
    this.formData.append('description', this.description);
    this.formData.append('productImage', this.productImage);
    this.http
      .post(`http://127.0.0.1:8080/api/product`, this.formData, {
        headers: this.httpHeaders,
      })
      .subscribe(
        (data) => {
          this.notify.openSnackBar('Product Added Successfully', 'Close');
        },
        (err) => {
          this.notify.openSnackBar('Could not add your product', 'Try Again');
        }
      );
  };
}
