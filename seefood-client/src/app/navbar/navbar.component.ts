import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { NotifyService } from '../services/notify.service';
import { OrderService } from '../services/order.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public userService: UserServiceService,
    public router: Router,
    public orderService: OrderService,
    public notify: NotifyService
  ) {}

  ngOnInit(): void {}

  openLoginDialog() {
    this.dialog.open(LoginComponent);
  }
  openRegisterDialog() {
    this.dialog.open(RegisterComponent);
  }

  logout() {
    this.userService.isLoggedIn = false;
    this.notify.openSnackBar('You Have Successfully Logged Out', 'Close');
    localStorage.clear();
    this.router.navigate(['']);
  }
}
