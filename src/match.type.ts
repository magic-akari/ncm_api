import type { Song } from "./album.type.ts";

export interface MatchAPI {
  result: {
    songs: Song[];
    ids: string[];
  };
}
