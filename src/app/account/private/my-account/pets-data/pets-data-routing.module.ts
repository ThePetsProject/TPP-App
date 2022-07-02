import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetsDataComponent } from './pets-data.component';

const routes: Routes = [{ path: '', component: PetsDataComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetsDataRoutingModule { }
