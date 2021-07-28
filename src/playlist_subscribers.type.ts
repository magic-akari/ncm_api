import { User } from "./user.type.ts";

export interface PlaylistSubscribers {
  total: number;
  code: number;
  more: boolean;
  subscribers: User[];
  reason?: string;
}
