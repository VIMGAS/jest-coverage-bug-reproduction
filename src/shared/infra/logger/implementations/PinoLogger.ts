import pino from 'pino';
import pinoHttp from 'pino-http';

import ILogger from '../interfaces/ILogger';

class PinoLogger implements ILogger {
  logger: pino.Logger;

  constructor(baseLogger?: pino.Logger) {
    let level = 'trace';
    if (process.env.NODE_ENV === 'production') level = 'info';
    if (process.env.NODE_ENV === 'stage') level = 'debug';
    if (process.env.NODE_ENV === 'testing') level = 'silent';

    this.logger =
      baseLogger ||
      pino({
        level,
        prettyPrint:
          process.env.NODE_ENV === 'production'
            ? false
            : { levelFirst: false, translateTime: true },
        name: 'Global',
        enabled: process.env.NODE_ENV !== 'testing',
        formatters: {
          level: (label, levelCode) => {
            return { level: label.toUpperCase(), levelCode };
          },
        },
      });
  }

  log(
    level: string,
    message: string,
    metadata?: Record<string, unknown>
  ): void {
    return this.logger[level]({ msg: message, ...metadata });
  }

  child(bindings?: Record<string, unknown>): PinoLogger {
    const child = this.logger.child(bindings || {});

    return new PinoLogger(child);
  }

  http() {
    return pinoHttp({
      logger: this.logger,
      genReqId: (request) => request.identifier,
    });
  }
}

export default new PinoLogger();
