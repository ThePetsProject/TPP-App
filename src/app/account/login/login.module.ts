import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginService } from 'src/app/services/login.service';
import { JwtService } from 'src/app/services/jwt.service';
import { AccountSharedModule } from '../account-shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRoutingModule, AccountSharedModule],
  providers: [LoginService, JwtService],
})
export class LoginModule {}
