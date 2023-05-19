import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

import decode from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private authServise: AuthService,
    private router: Router
  ) { }
  canActivate(): boolean {
    if (!this.authServise.isAuth()) {
      return true;
    } else {
      const token: any = localStorage.getItem('token');
      const { data }: any = decode(token);
      if (data.rolId === "admin") {
        this.router.navigate(['admin'])
        return false
      }
      this.router.navigate(['priv'])
      return false;
    }

  }

}
