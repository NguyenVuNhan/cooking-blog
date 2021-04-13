export interface BaseRes<T> {
  data: T;
  message: string;
  success: boolean;
}
