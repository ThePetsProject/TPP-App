import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAccountRoutingModule } from './my-account-routing.module';
import { MyAccountComponent } from './my-account.component';
import { CommonHttpModule } from 'src/app/shared/modules/common-http/common-http.module';
import { AccountMenuComponent } from '../components/account-menu/account-menu.component';

@NgModule({
  declarations: [MyAccountComponent, AccountMenuComponent],
  imports: [CommonModule, MyAccountRoutingModule, CommonHttpModule],
})
export class MyAccountModule {}
