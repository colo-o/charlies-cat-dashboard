import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { LoggerService } from './app/core/services/logger.service';

bootstrapApplication(App, appConfig)
  .then((appRef) => {
    const logger = appRef.injector.get(LoggerService);
    window.logger = logger;
  })
  .catch((err) => {
    const logger = window.logger;
    if (logger) {
      logger.error('Error during bootstrap:', err);
    } else {
      console.error('Error during bootstrap:', err);
    }
  });
