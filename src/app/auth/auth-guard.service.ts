import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

interface AuthResponse {
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  isAuth!: boolean;
  constructor(public auth: AuthService, public router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.auth.isAuthenticated().pipe(
      map((response) => {
        this.auth.setLoggedin(response.email !== null);
        return response.email !== null;
      }),
      catchError(() => this.router.navigate(['/login']))
    );
  }
}
