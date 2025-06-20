import { LoggerService } from './app/core/services/logger.service';

export {};

declare global {
  interface Window {
    logger: LoggerService;
  }
}
