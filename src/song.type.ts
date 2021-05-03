import type { Privilege } from "./privilege.type.ts";
import type { Track } from "./track.type.ts";

export interface SongDetailAPI {
  songs: Track[];
  privileges: Privilege[];
}
