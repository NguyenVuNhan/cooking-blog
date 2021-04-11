import { getReasonPhrase } from 'http-status-codes';

export function utilsException(): string {
  return 'utils-exception';
}

interface ErrorOptions {
  status?: number;
  error?: Error;
  stack?: string;
}

export class APIError extends Error {
  public error: Error;
  public status: number;

  constructor(
    public message: string,
    { status = 500, error, stack }: ErrorOptions
  ) {
    super(message);
    this.status = status;
    this.name = getReasonPhrase(status);
    this.message = message;
    this.error = error;
    this.stack = stack;
  }
}
