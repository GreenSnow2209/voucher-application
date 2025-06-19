import { logger, LoggerFunction } from '../utils/logger';

export abstract class BaseController {
  protected _logger: LoggerFunction;

  constructor() {
    this._logger = logger;
  }
}
