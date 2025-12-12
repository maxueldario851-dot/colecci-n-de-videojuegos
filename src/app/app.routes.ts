import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { GameListComponent } from './features/games/game-list/game-list';
import { GameFormComponent } from './features/games/game-form/game-form';
import { StatsDashboardComponent } from './features/statistics/stats-dashboard/stats-dashboard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'games',
    component: GameListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'games/new',
    component: GameFormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'games/edit/:id',
    component: GameFormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'stats',
    component: StatsDashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];