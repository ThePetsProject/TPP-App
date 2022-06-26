import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../shared/elements/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BackendErrorHandlerService } from '../services/backend-error-handler.service';
import { JwtService } from '../services/jwt.service';

@NgModule({
  declarations: [InputComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [InputComponent, FormsModule, ReactiveFormsModule],
  providers: [JwtService, BackendErrorHandlerService],
})
export class AccountSharedModule {}
