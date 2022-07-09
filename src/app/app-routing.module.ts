import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./account/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./account/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: 'account',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./account/private/my-account/my-account.module').then(
        (m) => m.MyAccountModule
      ),
  },
  { path: 'recuperar-clave', loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
