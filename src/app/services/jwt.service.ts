import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(private httpClient: HttpClient) {}

  saveJWT(key: string, token: string): void {
    localStorage.setItem(key, token);
  }

  removeJWT(key: string): void {
    localStorage.removeItem(key);
  }

  validateJWT(token: string): Observable<Object> {
    const validateUrl = `${environment.config.baseUrl}${environment.config.login.path}`;
    return this.httpClient.post(validateUrl, { token });
  }
}
