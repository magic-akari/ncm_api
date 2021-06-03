export interface Artist {
  name: string;
}

export interface Album {
  id: number;
  name: string;
  size: number;
  picUrl: string;
  alias: string[];
  artists: Artist[];
}

export interface SimpleSong {
  name: string;
  id: number;
  ar: Artist[];
  al: Album;
}

export interface Song {
  name: string;
  id: number;
  artists: Artist[];
  album: Album;
}

export interface AlbumAPI {
  songs: SimpleSong[];
}
