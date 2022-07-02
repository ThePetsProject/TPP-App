import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDataComponent } from './account-data.component';

const routes: Routes = [{ path: '', component: AccountDataComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountDataRoutingModule { }
