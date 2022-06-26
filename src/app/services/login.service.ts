import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const loginUrl = `${environment.config.baseUrl}${environment.config.login.path}`;
    return this.http.post(loginUrl, { email, password });
  }
}
