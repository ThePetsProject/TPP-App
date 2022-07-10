import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendErrorHandlerService } from '../services/backend-error-handler.service';
import { JwtService } from '../services/jwt.service';
import { FormModule } from '../shared/elements/form/form.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormModule],
  exports: [FormModule],
  providers: [JwtService, BackendErrorHandlerService],
})
export class AccountSharedModule {}
