import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './pages/home/home.module';
import { MainNavComponent } from './shared/main-nav/main-nav.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { JwtService } from './services/jwt.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { CommonHttpModule } from './shared/modules/common-http/common-http.module';

@NgModule({
  declarations: [AppComponent, MainNavComponent, LoaderComponent],
  imports: [BrowserModule, AppRoutingModule, HomeModule, CommonHttpModule],
  providers: [JwtService, AuthGuardService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
