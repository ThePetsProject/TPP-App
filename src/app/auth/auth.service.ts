import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';
import { ValidateJwtResponse } from '../shared/interfaces/validate-jwt-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedin() {
    return this.loggedIn.asObservable();
  }

  setLoggedin(loggedIn: boolean) {
    this.loggedIn.next(loggedIn);
  }

  constructor(private jwtService: JwtService) {}

  // isAuthenticated(): Observable<ValidateJwtResponse> {
  isAuthenticated() {
    const accToken = this.jwtService.getAccToken();
    const refToken = this.jwtService.getRefToken();
    return this.jwtService.validateJWT(accToken);
  }

  login(accToken: string, refToken: string): void {
    this.jwtService.saveJWT('accToken', accToken);
    this.jwtService.saveJWT('refToken', refToken);
    this.loggedIn.next(true);
  }

  logout(): void {
    this.jwtService.removeJWT('accToken');
    this.jwtService.removeJWT('refToken');
    this.loggedIn.next(false);
  }
}
