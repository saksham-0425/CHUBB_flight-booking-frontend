import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  },

  // 🔓 PUBLIC ROUTES
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register').then(m => m.Register)
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./features/flight/search/search').then(m => m.Search)
  },

  // 🔐 PROTECTED ROUTES (later)
  // {
  //   path: 'book',
  //   canActivate: [AuthGuard],
  //   loadComponent: ...
  // },

  {
    path: '**',
    redirectTo: 'search'
  }
];
