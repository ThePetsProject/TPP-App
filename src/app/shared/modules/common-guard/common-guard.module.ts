import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonHttpModule } from '../common-http/common-http.module';
import { JwtService } from 'src/app/services/jwt.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, CommonHttpModule],
  providers: [JwtService],
})
export class CommonGuardModule {}
