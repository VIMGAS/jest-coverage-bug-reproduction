export default interface ILogger {
  log(level: string, message: string, metadata?: Record<string, unknown>): void;

  child?(bindings?: Record<string, unknown>): ILogger;

  http?(): any;
}
