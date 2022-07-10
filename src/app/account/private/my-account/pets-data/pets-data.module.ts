import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetsDataRoutingModule } from './pets-data-routing.module';
import { PetsDataComponent } from './pets-data.component';
import { AccountSharedModule } from 'src/app/account/account-shared.module';
import { ModalModule } from 'src/app/shared/elements/modal/modal.module';

@NgModule({
  declarations: [PetsDataComponent],
  imports: [
    CommonModule,
    PetsDataRoutingModule,
    AccountSharedModule,
    ModalModule,
  ],
})
export class PetsDataModule {}
