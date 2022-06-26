import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginService } from 'src/app/services/login.service';
import { AccountSharedModule } from '../account-shared.module';
import { CommonHttpModule } from 'src/app/shared/modules/common-http/common-http.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    AccountSharedModule,
    CommonHttpModule,
  ],
  providers: [LoginService],
})
export class LoginModule {}
