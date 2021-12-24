export interface TracklistVOItem {
  playlistId: number;
  trackId: number;
  trackName: string;
  artists: string[];
  albumName: string;
  deleteTrackTime: number;
  position: unknown;
  status: string;
}

export interface PlaylistRecoverTrackListAPI {
  code: number;
  message: string;
  data: {
    listVO: TracklistVOItem[];
    hasMore: boolean;
  };
}
