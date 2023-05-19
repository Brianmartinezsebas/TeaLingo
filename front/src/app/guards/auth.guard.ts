import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authServise: AuthService,
    private router: Router
  ) { }
  canActivate(): boolean {
    if (!this.authServise.isAuth()) {
      this.router.navigate(['login'], { queryParams: { refresh: 1 } });
      return false;
    }
    return true;
  }
}
