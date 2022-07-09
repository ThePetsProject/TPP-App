import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDataComponent } from './account-data/account-data.component';
import { MyAccountComponent } from './my-account.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'account-data',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MyAccountComponent,
    children: [
      {
        path: 'account-data',
        loadChildren: () =>
          import('./account-data/account-data.module').then(
            (m) => m.AccountDataModule
          ),
      },
      {
        path: 'pets-data',
        loadChildren: () =>
          import('./pets-data/pets-data.module').then((m) => m.PetsDataModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAccountRoutingModule {}
