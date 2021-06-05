export type AsyncFunction = (...args: unknown[]) => Promise<unknown>;

export interface ILogger {
  info(message?: string | number, details?: unknown): void;
  error(message?: string | number, details?: unknown): void;
  warn(message?: string | number, details?: unknown): void;
  debug(message?: string | number, details?: unknown): void;
}

export interface ValidationErrorDetails {
  [key: string]: {
    [key: string]: string;
  };
}

export type PartialDeep<T> = { [P in keyof T]?: PartialDeep<T[P]> };
