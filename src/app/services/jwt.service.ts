import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ValidateJwtResponse } from '../shared/interfaces/validate-jwt-response';

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

  getAccToken(): string {
    return localStorage.getItem('accToken') || '';
  }
  getRefToken(): string {
    return localStorage.getItem('refToken') || '';
  }

  validJWT(token: string): Observable<ValidateJwtResponse> {
    const validateUrl = `${environment.config.baseUrl}${environment.config.jwtValidate.path}`;
    return this.httpClient.post<ValidateJwtResponse>(validateUrl, { token });
  }
}
