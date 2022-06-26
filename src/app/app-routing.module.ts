import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
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
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'account',
    children: [
      { path: '', redirectTo: 'my-account', pathMatch: 'full' },
      {
        path: 'my-account',
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import('./account/private/my-account/my-account.module').then(
            (m) => m.MyAccountModule
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
