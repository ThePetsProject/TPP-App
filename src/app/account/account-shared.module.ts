import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../shared/elements/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BackendErrorHandlerService } from '../services/backend-error-handler.service';
import { JwtService } from '../services/jwt.service';
import { FormComponent } from '../shared/elements/form/form.component';
import { SelectComponent } from '../shared/elements/select/select.component';

@NgModule({
  declarations: [FormComponent, InputComponent, SelectComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    FormComponent,
    InputComponent,
    SelectComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [JwtService, BackendErrorHandlerService],
})
export class AccountSharedModule {}
