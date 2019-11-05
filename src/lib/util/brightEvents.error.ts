export class BrightEventsError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    if (statusCode) {
      this.statusCode = statusCode;
    }
  }
}
