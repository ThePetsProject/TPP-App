import { HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackendResponse } from '../shared/interfaces/backend-response';

interface CustomHttpResponseBase extends HttpResponseBase {
  error: BackendResponse;
}

interface Responses409 {
  'User exists': string;
}

interface ResponsesCodes {
  '409': Responses409;
}

const responses: ResponsesCodes = {
  '409': {
    'User exists': 'El usuario ya existe. Por favor, intenta de nuevo.',
  },
};

@Injectable({
  providedIn: 'root',
})
export class BackendErrorHandlerService {
  constructor() {}

  handleUserErrorMessage(error: CustomHttpResponseBase): string {
    const backendResponse: BackendResponse = error.error;
    const backendResponseMessage = backendResponse.message as string;
    const errorCode = error.status;

    if (errorCode === 500 || errorCode === 400)
      return 'Ha ocurrido un error inesperado. Por favor intenta más tarde.';

    const userMessage: string =
      responses[errorCode.toString() as keyof ResponsesCodes][
        backendResponseMessage as keyof Responses409
      ];
    return userMessage;
  }
}
