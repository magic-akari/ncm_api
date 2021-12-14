export interface Artist {
  name: string;
}

export interface SimpleAlbum {
  id: number;
  name: string;
  size: number;
  picUrl: string;
  "picId_str": string;
  alias: string[];
  artists: Artist[];
}

export interface SimpleSong {
  name: string;
  id: number;
  ar: Artist[];
  al: SimpleAlbum;
}

export interface Song {
  name: string;
  id: number;
  artists: Artist[];
  album: SimpleAlbum;
}

export interface AlbumAPI {
  code: number;
  songs: SimpleSong[];
  album: Album;
}

export interface Album {
  songs: unknown[];
  paid: boolean;
  onSale: boolean;
  mark: number;
  blurPicUrl: string;
  companyId: number;
  alias: string[];
  artists: Artist[];
  copyrightId: number;
  // picId: number;
  artist: Artist;
  publishTime: number;
  company: string;
  briefDesc: string;
  picUrl: string;
  commentThreadId: string;
  pic: number;
  tags: string;
  description: string;
  status: number;
  subType: string;
  name: string;
  id: number;
  type: number;
  size: number;
  "picId_str": string;
  info: {
    commentThread: unknown;
    latestLikedUsers: unknown;
    liked: boolean;
    comments: unknown;
    resourceType: number;
    resourceId: number;
    commentCount: number;
    likedCount: number;
    shareCount: number;
    threadId: string;
  };
}
