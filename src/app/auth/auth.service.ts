import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';
import { ValidateJwtResponse } from '../shared/interfaces/validate-jwt-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private jwtService: JwtService) {}

  isAuthenticated(): Observable<ValidateJwtResponse> {
    const accToken = this.jwtService.getAccToken();
    const refToken = this.jwtService.getRefToken();
    return this.jwtService.validJWT(accToken);
  }
}
