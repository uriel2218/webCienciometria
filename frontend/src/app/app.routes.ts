import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { LayoutComponent as AdminLayoutComponent } from './features/admin/layout/layout.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { PublicLayoutComponent } from './features/public/public-layout/public-layout.component';
import { HomeComponent } from './features/public/home/home.component';
import { MembersPublicComponent } from './features/public/members-public/members-public.component';
import { MembersAdminComponent } from './features/admin/members-admin/members-admin.component';
import { authGuard } from './core/guards/auth.guard';
// import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  
  // Rutas del Sitio Público (No protegidas)
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'miembros', component: MembersPublicComponent },
      // Aquí puedes mapear producción y difusión luego
    ]
  },

  // Ruta de Autenticación
  { path: 'login', component: LoginComponent },
  
  // Rutas del Panel de Administración (Protegidas)
  { 
    path: 'admin', 
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'miembros', component: MembersAdminComponent },
    ]
  },
  
  { path: '**', redirectTo: '' }
];
