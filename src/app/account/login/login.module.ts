import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginService } from 'src/app/services/login.service';
import { AccountSharedModule } from '../account-shared.module';
import { CommonHttpModule } from 'src/app/shared/modules/common-http/common-http.module';
import { ModalModule } from 'src/app/shared/elements/modal/modal.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    AccountSharedModule,
    CommonHttpModule,
    ModalModule,
  ],
  providers: [LoginService],
})
export class LoginModule {}
