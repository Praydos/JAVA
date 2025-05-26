import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuthenticated = authService.isAuthenticated;
  if (!isAuthenticated) {
    console.warn('User is not authenticated. Redirecting to login page.');
    router.navigateByUrl('/login');
    return false;
  }
  return true;
};
