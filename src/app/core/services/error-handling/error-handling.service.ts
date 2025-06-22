import { Injectable, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../notification/notification.service';
import { LoggerService } from '../logger.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  private notificationService = inject(NotificationService);
  private logger = inject(LoggerService);

  handleHttpError(error: HttpErrorResponse): void {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `A client-side error occurred: ${error.error.message}`;
      this.logger.error(errorMessage, error);
    } else {
      errorMessage = this.getServerErrorMessage(error);
      this.logger.error(errorMessage, { status: error.status, body: error.error });
    }

    this.notificationService.showError(errorMessage);
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400:
        return `Bad Request. ${error.error?.message || 'Please check your input.'}`;
      case 401:
        return 'Unauthorized. Please login again.';
      case 403:
        return 'Forbidden. You do not have permission to access this resource.';
      case 404:
        return 'Not Found. The requested resource could not be found.';
      case 500:
        return 'Internal Server Error. Please try again later.';
      default:
        return `An unexpected error occurred. (Code: ${error.status})`;
    }
  }
}
