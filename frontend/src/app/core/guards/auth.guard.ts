import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificamos el signal isAuthenticated()
  if (authService.isAuthenticated()) {
    return true;
  }

  // Si no está autenticado, lo enviamos al login
  return router.createUrlTree(['/login']);
};

