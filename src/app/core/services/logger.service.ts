import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  log(message: unknown, ...optionalParams: unknown[]) {
    console.log(message, ...optionalParams);
  }

  warn(message: unknown, ...optionalParams: unknown[]) {
    console.warn(message, ...optionalParams);
  }

  error(message: unknown, ...optionalParams: unknown[]) {
    console.error(message, ...optionalParams);
  }
}
