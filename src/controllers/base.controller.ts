import { logger, LoggerFunction } from '../utils/logger';

export abstract class BaseController {
  protected logger: LoggerFunction;

  constructor() {
    this.logger = logger;
  }
}
