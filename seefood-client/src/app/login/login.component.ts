import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserServiceService } from '../services/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    public http: HttpClient,
    public router: Router,
    public matDialog: MatDialog,
    public userService: UserServiceService,
    private _snackBar: MatSnackBar,
    public notify: NotifyService
  ) {}

  ngOnInit(): void {}

  email: string = '';
  password: string = '';

  // username = new FormControl();
  loginHandler = () => {
    this.http
      .post(`http://127.0.0.1:8080/api/user/login`, {
        email: this.email,
        password: this.password,
      })
      .subscribe(
        (res) => {
          console.log('response success => ', JSON.parse(JSON.stringify(res)));

          console.log(
            'response success token => ',
            JSON.parse(JSON.stringify(res)).token
          );
          // this._snackBar.openFromComponent(LoginComponent, {
          //   duration : 5000
          // })

          localStorage.setItem(
            'auth-token',
            JSON.parse(JSON.stringify(res)).token
          );
          // this.userService.token = JSON.stringify(res);
          this.router.navigate(['view']);
          this.notify.openSnackBar('Login Successfull', 'Close');
          this.matDialog.closeAll();
          this.userService.isLoggedIn = true;

          // localStorage.getItem('auth-token')
        },
        (error) => {
          console.log('errrorr', error);
          this.notify.openSnackBar('Login Unsuccessfull', 'Try Again');
        }
      );

    // this.httpClient.post<any>('http://127.0.0.1:8080/users/login', {
    //   username: this.username,
    //   password: this.password,
    // });
  };
}
