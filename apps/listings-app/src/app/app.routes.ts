import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    loadChildren: () => import('@discover/auth').then(m => m.AUTH_ROUTES)
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];
