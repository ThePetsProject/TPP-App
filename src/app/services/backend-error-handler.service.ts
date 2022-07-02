import { HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackendResponse } from '../shared/interfaces/backend-response';

interface CustomHttpResponseBase extends HttpResponseBase {
  error: BackendResponse;
}

interface ResponsesCodes {
  '400': string;
  '401': string;
  '404': string;
  '409': string;
  '500': string;
}

const responses: ResponsesCodes = {
  '400': 'Ha ocurrido un error inesperado. Por favor intenta más tarde.',
  '401': 'Usuario o clave inválida. Por favor, inenta de nuevo.',
  '404': 'Usuario o clave inválida. Por favor, inenta de nuevo.',
  '409': 'El usuario ya existe. Por favor, intenta de nuevo.',
  '500': 'Ha ocurrido un error inesperado. Por favor intenta más tarde.',
};

@Injectable({
  providedIn: 'root',
})
export class BackendErrorHandlerService {
  constructor() {}

  handleUserErrorMessage(error: CustomHttpResponseBase): string {
    return responses[error.status.toString() as keyof ResponsesCodes];
  }
}
