import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from 'src/app/services/jwt.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const securedRequesst = request.url.includes('secure');
    let req = request;

    if (securedRequesst) {
      const accToken = this.jwtService.getAccToken();
      const refToken = this.jwtService.getRefToken();
      req = request.clone({
        setHeaders: {
          authorization: `Bearer ${accToken}`,
        },
      });
    }
    return next.handle(req);
  }
}
