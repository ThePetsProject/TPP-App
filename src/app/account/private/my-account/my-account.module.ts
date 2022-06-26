import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAccountRoutingModule } from './my-account-routing.module';
import { MyAccountComponent } from './my-account.component';
import { CommonHttpModule } from 'src/app/shared/modules/common-http/common-http.module';

@NgModule({
  declarations: [MyAccountComponent],
  imports: [CommonModule, MyAccountRoutingModule, CommonHttpModule],
})
export class MyAccountModule {}
