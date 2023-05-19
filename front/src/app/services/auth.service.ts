import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { backUrl } from '../url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = backUrl;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService) { }

  singin(user: any) {
    return this.http.post(`${this.URL}/user/singin`, user);
  }

  isAuth(): boolean {
    const token = localStorage.getItem('token');
    if (this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')) {
      return false;
    }
    return true;
  }

  isAdmin() {
    if (this.isAuth()) {
      const token: any = localStorage.getItem('token');
      const dec: any = this.jwtHelper.decodeToken(token);
      if (dec.data.rolId !== "admin") {
        return false
      } else {
        return true
      }
    }
    return false
  }
}