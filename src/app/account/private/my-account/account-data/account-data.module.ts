import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountDataRoutingModule } from './account-data-routing.module';
import { AccountDataComponent } from './account-data.component';
import { AccountSharedModule } from 'src/app/account/account-shared.module';

@NgModule({
  declarations: [AccountDataComponent],
  imports: [CommonModule, AccountDataRoutingModule, AccountSharedModule],
})
export class AccountDataModule {}
