import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  isLoggedIn: boolean = false;
  isUserAdmin: boolean = false;
  token: any = localStorage.getItem('auth-token');
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'auth-token': this.token,
  });
  restaurentId: any;
  constructor(private http: HttpClient) {}

  getUserData = () => {
    return this.http.get(`http://127.0.0.1:8080/api/user/`, {
      headers: this.httpHeaders,
    });
  };

  // registerNewUser(data: any) {
  //   return this.http.post(this.registerUrl, data);
  // }
}
