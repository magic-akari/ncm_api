export interface PlaylistVOItem {
  playlistId: number;
  playlistName: string;
  coverImgUrl: string;
  recenDeleteTime: number;
}

export interface PlaylistRecoverForTrackListAPI {
  code: number;
  message: string;
  data: {
    listVO: PlaylistVOItem[];
    hasMore: boolean;
  };
}
