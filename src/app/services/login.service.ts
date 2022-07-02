import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  callLogin(email: string, password: string) {
    const loginUrl = `${environment.config.baseUrl}${environment.config.login.path}`;
    return this.http.post(loginUrl, { email, password });
  }

  login(accToken: string, refToken: string) {
    this.authService.login(accToken, refToken);
  }

  logout() {
    this.authService.logout();
  }
}
