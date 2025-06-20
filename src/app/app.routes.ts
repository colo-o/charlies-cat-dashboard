import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { authGuard } from './core/guards/auth.guard';
import { UserDetailComponent } from './features/user-detail/user-detail.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  {
    path: 'user/:id',
    component: UserDetailComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' },
];
