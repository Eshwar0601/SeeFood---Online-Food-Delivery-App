import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { UserServiceService } from '../services/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { NotifyService } from '../services/notify.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    public notify: NotifyService
  ) {}

  ngOnInit(): void {}

  username: string = '';
  email: string = '';
  password: string = '';
  RegError: any = '';
  isError: boolean = false;

  RegisterNewUser() {
    this.http
      .post(`http://127.0.0.1:8080/api/user/register`, {
        username: this.username,
        email: this.email,
        password: this.password,
      })
      .subscribe(
        (res) => {
          this.notify.openSnackBar('User Registration Successfull', 'Close');
          // this.toastr.success('Hello world!', 'Toastr fun!');
          // this.dialog.closeAll();
        },
        (error) => {
          this.notify.openSnackBar('Could not Register User', 'Try Again');
          this.RegError = error.error;
          this.isError = true;
          console.log('errrrr', this.RegError.errors.email.message);
          // this.toastr.error(error.error, 'Error');
        }
      );
  }
  matcher = new MyErrorStateMatcher();
}
