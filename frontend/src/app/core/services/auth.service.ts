import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Cuando estemos en producción / Nginx, "/api/v1/auth" se dirigirá automáticamente al backend
  private apiUrl = '/api/v1/auth';
  
  // Manejo de estado moderno usando Signals (Angular 16+)
  currentUser = signal<any>(null);
  isAuthenticated = signal<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    this.checkInitialState();
  }

  private checkInitialState() {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.isAuthenticated.set(true);
      // Opcional: cargar datos del perfil si ya hay sesión guardada
      this.fetchUserProfile().subscribe({
        error: () => this.logout() // Si el token expiró, cerrar sesión
      });
    }
  }

  login(email: string, password: string) {
    const formData = new URLSearchParams();
    formData.set('username', email);
    formData.set('password', password);

    return this.http.post<{access_token: string, token_type: string}>(
      `${this.apiUrl}/login`, 
      formData.toString(), 
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    ).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.access_token);
        this.isAuthenticated.set(true);
        this.fetchUserProfile().subscribe();
        this.router.navigate(['/admin']);
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  fetchUserProfile() {
    return this.http.get<any>(`${this.apiUrl}/me`).pipe(
      tap(user => this.currentUser.set(user))
    );
  }
}

