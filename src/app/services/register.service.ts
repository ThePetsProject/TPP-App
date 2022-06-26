import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(email: string, password: string) {
    const registerUrl = `${environment.config.baseUrl}${environment.config.register.path}`;
    return this.http.post(registerUrl, { email, password });
  }
}
