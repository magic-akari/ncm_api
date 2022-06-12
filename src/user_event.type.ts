export interface UserEventApi<T> {
  lasttime: number;
  more: boolean;
  size: number;
  events: T[];
  code: number;
}
