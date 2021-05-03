import type { Privilege } from "./privilege.type.ts";
import type { Track, TrackId } from "./track.type.ts";

export interface PlaylistAPI {
  playlist: Playlist[];
  privileges: Privilege[];
}

export interface Playlist {
  id: number;
  name: string;
  coverImgId: number;
  coverImgUrl: string;
  coverImgId_str: string;
  adType: number;
  userId: number;
  createTime: number;
  status: number;
  opRecommend: boolean;
  highQuality: boolean;
  newImported: boolean;
  updateTime: number;
  trackCount: number;
  specialType: number;
  privacy: number;
  trackUpdateTime: number;
  commentThreadId: string;
  playCount: number;
  trackNumberUpdateTime: number;
  subscribedCount: number;
  cloudTrackCount: number;
  ordered: true;
  description: string;
  tags: string[];
  updateFrequency: unknown;
  backgroundCoverId: number;
  backgroundCoverUrl: unknown;
  titleImage: number;
  titleImageUrl: unknown;
  englishTitle: unknown;
  subscribers: unknown[];
  subscribed: boolean;
  creator: unknown;
  tracks: Track[];
  videoIds: unknown;
  videos: unknown;
  trackIds: TrackId[];
  shareCount: number;
  commentCount: number;
  remixVideo: unknown;
}
