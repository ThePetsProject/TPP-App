import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { RegisterService } from 'src/app/services/register.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountSharedModule } from '../account-shared.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, RegisterRoutingModule, AccountSharedModule],
  providers: [RegisterService],
})
export class RegisterModule {}
