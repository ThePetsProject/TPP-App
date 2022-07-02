import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetsDataRoutingModule } from './pets-data-routing.module';
import { PetsDataComponent } from './pets-data.component';


@NgModule({
  declarations: [
    PetsDataComponent
  ],
  imports: [
    CommonModule,
    PetsDataRoutingModule
  ]
})
export class PetsDataModule { }
