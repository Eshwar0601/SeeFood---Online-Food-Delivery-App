import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../services/notify.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css'],
})
export class AddRestaurantComponent implements OnInit {
  constructor(
    public http: HttpClient,
    public userService: UserServiceService,
    public notify: NotifyService
  ) {}

  name: string = '';
  address: string = '';
  description: string = '';
  restaurantImage: any;
  token: any = localStorage.getItem('auth-token');
  httpHeaders = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'auth-token': this.token,
  });
  formData = new FormData();

  // headers = new HttpHeaders({
  //   'auth-token': this.token,
  // });

  onChange(event: any) {
    this.restaurantImage = event.target.files[0];
    console.log('file chosen = ', this.restaurantImage);
  }

  ngOnInit(): void {
    console.log('tokkkkkkkkennn', this.httpHeaders);
    console.log(
      'tokkkkkkkkennnnnnnnnnnnnnnnnnnnnnn',
      localStorage.getItem('auth-token')
    );
    this.http
      .get('http://127.0.0.1:8080/api/restaurant/', {
        headers: this.httpHeaders,
      })
      .subscribe(
        (data) => {
          console.log('Succesfully fetched =>', data);
        },
        (err) => {
          console.log('error encountered => ', err);
        }
      );
  }

  registerRestaurant = () => {
    this.formData.append('name', this.name);
    this.formData.append('description', this.description);
    this.formData.append('address', this.address);
    this.formData.append('restaurantImage', this.restaurantImage);
    this.http
      .post('http://127.0.0.1:8080/api/restaurant/', this.formData, {
        headers: this.httpHeaders,
      })
      .subscribe(
        (data) => {
          this.notify.openSnackBar('Restaurant Successfully Added', 'Close');
          this.notify.openSnackBar(
            'You can now manage your restaurants from Dashboard',
            'Close'
          );
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.notify.openSnackBar(
              'Could not register restaurant',
              'Try Again'
            );
          } else {
            this.notify.openSnackBar(
              'Could not register restaurant',
              'Try Again'
            );
          }
        }
      );
  };
}
