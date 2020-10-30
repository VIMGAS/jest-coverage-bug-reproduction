import ILogger from '../interfaces/ILogger';

class FakePinoLogger implements ILogger {
  log(): void {}

  child(): FakePinoLogger {
    return new FakePinoLogger();
  }

  http() {
    return () => {};
  }
}

export default new FakePinoLogger();
