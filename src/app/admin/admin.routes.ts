import { Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth-guard';
import { roleGuard } from '../core/guards/role-guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard, roleGuard],
    loadComponent: () =>
      import('./admin-layout/admin-layout').then(m => m.AdminLayout),
    children: [

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard').then(m => m.Dashboard)
      },

      {
        path: 'flights',
        loadComponent: () =>
          import('./flights/flights').then(m => m.Flights),
        runGuardsAndResolvers: 'always'
      },

      {
        path: 'flights/edit/:id',
        loadComponent: () =>
          import('./flights/edit-flight/edit-flight').then(m => m.EditFlight)
      },

      {
        path: 'add-flight',
        loadComponent: () =>
          import('./add-flight/add-flight').then(m => m.AddFlight)
      },

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];
