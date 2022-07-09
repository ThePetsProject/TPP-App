import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { CommonHttpModule } from 'src/app/shared/modules/common-http/common-http.module';
import { AccountSharedModule } from 'src/app/account/account-shared.module';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    CommonHttpModule,
    AccountSharedModule,
  ],
})
export class ResetPasswordModule {}
