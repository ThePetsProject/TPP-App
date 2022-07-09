import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface AccountDataResponse {
  email: string;
  name?: string;
  surName?: string;
}

export interface AccountNewData {
  email?: string;
  name?: string;
  surName?: string;
  password?: string;
}

interface ErrorStatusMessages {
  '0'?: string;
  '401'?: string;
  '404'?: string;
  '500'?: string;
}

const errorStatusMessagesResetPassword: ErrorStatusMessages = {
  '0': 'Lo sentimos, ha ocurrido un error inesperado. Por favor intenta más tarde.',
  '404':
    'Lo sentimos, este link es inválido. Por favor solicita una nueva clave.',
  '500':
    'Lo sentimos, ha ocurrido un error inesperado. Por favor intenta más tarde.',
};

const errorStatusMessagesRequestResetPassword: ErrorStatusMessages = {
  '0': 'Lo sentimos, ha ocurrido un error inesperado. Por favor intenta más tarde.',
  '401': 'Lo sentimos, correo inválido.',
  '404': 'Lo sentimos, correo inválido.',
  '500':
    'Lo sentimos, ha ocurrido un error inesperado. Por favor intenta más tarde.',
};

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private httpClient: HttpClient) {}

  saveAccountData(data: AccountNewData) {
    const getAccountDataUrl = `${environment.config.baseUrl}${environment.config.accountData.path}`;

    return this.httpClient.post(getAccountDataUrl, data).pipe(
      catchError((error) => {
        console.error('ERROR ON GET ACCDATA ', error);
        return EMPTY;
      })
    );
  }

  getAccountData() {
    const getAccountDataUrl = `${environment.config.baseUrl}${environment.config.accountData.path}`;

    return this.httpClient
      .get<AccountDataResponse>(getAccountDataUrl, {
        observe: 'body',
        responseType: 'json',
      })
      .pipe(catchError((error: HttpErrorResponse) => throwError(() => error)));
  }

  requestPasswordRecovery(email: string) {
    const recoverPasswordUrl = `${environment.config.baseUrl}${environment.config.recoverPassword.path}`;

    return this.httpClient.post(recoverPasswordUrl, {
      email,
    });
  }

  private handleResetPasswordError(error: HttpErrorResponse) {
    const { status } = error;
    return throwError(
      () =>
        errorStatusMessagesResetPassword[
          status.toString() as keyof ErrorStatusMessages
        ]
    );
  }

  resetPassword(token: string, password: string) {
    const resetPasswordUrl = `${environment.config.baseUrl}${environment.config.resetPassword.path}`;

    return this.httpClient
      .post(resetPasswordUrl, {
        token,
        password,
      })
      .pipe(catchError(this.handleResetPasswordError));
  }
}
