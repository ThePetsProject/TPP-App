import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { RegisterService } from 'src/app/services/register.service';
import { AccountSharedModule } from '../account-shared.module';
import { CommonHttpModule } from 'src/app/shared/modules/common-http/common-http.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    AccountSharedModule,
    CommonHttpModule,
  ],
  providers: [RegisterService],
})
export class RegisterModule {}
