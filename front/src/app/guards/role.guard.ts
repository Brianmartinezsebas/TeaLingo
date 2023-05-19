import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { backUrl } from '../url';

import decode from 'jwt-decode'
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  private url = backUrl;
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    public router: Router,
  ) { }
  canActivate(route: ActivatedRouteSnapshot):any {
    const expectedRole = route.data['expectedRole'];
    const token: any = localStorage.getItem('token');
    const { data }: any = decode(token);
    if (!localStorage.getItem('token') || data.rolId !== expectedRole) {
      this.router.navigate(['user/panel'])
      return false;
    }
    return this.http.post(this.url + '/user/test', token).subscribe(async (res: any) =>{
      if(res === "Token valido"){
        return true
      }
      this.router.navigate(['user/panel'])
      return false
    });
  }
}

