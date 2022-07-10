import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InputComponent } from '../input/input.component';
import { SelectComponent } from '../select/select.component';
import { FormComponent } from './form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputComponent, SelectComponent, FormComponent],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [
    InputComponent,
    SelectComponent,
    FormComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class FormModule {}
