import { StatsDashboardComponent } from './features/statistics/stats-dashboard/stats-dashboard';
import { Routes } from '@angular/router';
import { GameListComponent } from './features/games/game-list/game-list';
import { GameFormComponent } from './features/games/game-form/game-form';

export const routes: Routes = [
  { path: '', component: GameListComponent, pathMatch: 'full' },
  { path: 'games', component: GameListComponent },
  { path: 'games/new', component: GameFormComponent },
  { path: 'games/edit/:id', component: GameFormComponent },
  { path: 'stats', component: StatsDashboardComponent },
];
