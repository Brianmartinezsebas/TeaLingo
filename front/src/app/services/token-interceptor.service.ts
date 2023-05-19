import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  intercept(req: any, next: any) {
    const token = localStorage.getItem('token')
    const tokenheader = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token
      }
    });
    return next.handle(tokenheader).pipe(
      catchError(error => {
        // Verifica si la respuesta es un error de token expirado
        if (error.status === 401 || error.error.message === 'Token Expired') {
          // Si el token expiró, redirige al usuario a la página de inicio de sesión
          window.location.reload();
        }
        // Si la respuesta no es un error de token expirado, simplemente devuelve el error
        return throwError(error);
      })
    );
    // return next.handle(tokenheader)
  }
  constructor() { }
}
