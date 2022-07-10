import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetsMapComponent } from './pets-map.component';

const routes: Routes = [{ path: '', component: PetsMapComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetsMapRoutingModule { }
