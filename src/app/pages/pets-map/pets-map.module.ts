import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetsMapRoutingModule } from './pets-map-routing.module';
import { PetsMapComponent } from './pets-map.component';
import { FormModule } from 'src/app/shared/elements/form/form.module';
import { ModalModule } from 'src/app/shared/elements/modal/modal.module';

@NgModule({
  declarations: [PetsMapComponent],
  imports: [CommonModule, PetsMapRoutingModule, FormModule, ModalModule],
})
export class PetsMapModule {}
