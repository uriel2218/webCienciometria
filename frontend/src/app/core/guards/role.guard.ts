import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // Obtenemos los datos del usuario actual del Signal
  const user = authService.currentUser();
  
  // Leemos los roles esperados para esta ruta (configurados en app.routes.ts)
  const expectedRoles = route.data['roles'] as Array<string>;

  // Si no hay usuario ni sesión
  if (!authService.isAuthenticated() || !user) {
    return router.createUrlTree(['/login']);
  }

  // Comparamos el rol del usuario con los roles permitidos en la ruta
  if (expectedRoles && !expectedRoles.includes(user.role)) {
    // Usuario logueado pero sin privilegios suficientes (ej. Editor intentando entrar a ruta Admin)
    return router.createUrlTree(['/unauthorized']); 
  }

  return true;
};

