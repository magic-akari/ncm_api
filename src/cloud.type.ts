import { SimpleSong } from "./album.type.ts";

export interface CloudItem {
  simpleSong: SimpleSong;
  fileSize: number;
  album: string;
  artist: string;
  bitrate: number;
  songId: number;
  addTime: number;
  songName: string;
  cover: number;
  lyricId: string;
  coverId: string;
  version: number;
  fileName: string;
}

export interface CloudApi {
  data: CloudItem[];
  count: number;
  size: string;
  maxSize: string;
  upgradeSign: number;
  hasMore: boolean;
  code: number;
}
