import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const userRoles: String = authService.roles;

  if (userRoles.includes('ADMIN')) {
    return true;
  }
  console.warn('User does not have the required role. Redirecting to not authorized page.');
  router.navigateByUrl('/admin/notAuthorized');
  return false;
};
