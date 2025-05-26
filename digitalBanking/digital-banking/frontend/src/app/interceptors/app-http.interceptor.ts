import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);

  if (!req.url.includes('/auth/login')) {
    const modifiedReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        'Bearer ' + localStorage.getItem('access-token')
      ),
    });
    return next(modifiedReq).pipe(
      catchError((error) => {
        if (error.status === 401) {
          authService.logout();
        }
        return throwError(error);
      })
    );
  }
  return next(req);
};
