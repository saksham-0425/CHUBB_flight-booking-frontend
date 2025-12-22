import { Routes } from '@angular/router';
import { TrackBooking } from './pages/track-booking/track-booking';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  },

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

  {
    path: 'booking',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/booking/booking/booking')
        .then(m => m.Booking)
  },

  {
    path: 'track-booking',
    canActivate: [authGuard],
    component: TrackBooking
  },

  // 🔽 ADMIN ROUTES (COMING NEXT)
{
  path: 'admin',
  loadChildren: () =>
    import('./admin/admin.routes')
      .then(m => m.ADMIN_ROUTES)
},

  {
    path: '**',
    redirectTo: 'search'
  }
];
