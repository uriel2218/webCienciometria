import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Obtenemos el token almacenado de la sesión actual
  const token = localStorage.getItem('access_token');
  
  // Si existe el token, clonamos la petición y le agregamos el header 'Authorization'
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }
  
  // Si no hay token, dejamos pasar la petición tal como está (ej. para login)
  return next(req);
};

