import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountDataRoutingModule } from './account-data-routing.module';
import { AccountDataComponent } from './account-data.component';


@NgModule({
  declarations: [
    AccountDataComponent
  ],
  imports: [
    CommonModule,
    AccountDataRoutingModule
  ]
})
export class AccountDataModule { }
