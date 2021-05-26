export type AsyncFunction = (...args: unknown[]) => Promise<unknown>;

export interface ILogger {
  info(message?: string, details?: unknown): void;
  error(message?: string, details?: unknown): void;
  warn(message?: string, details?: unknown): void;
  debug(message?: string, details?: unknown): void;
}

export type PartialDeep<T> = { [P in keyof T]?: PartialDeep<T[P]> };
