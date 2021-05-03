export interface LocalMusicFile {
  path: string;
  filename: string;
  title: string;
  album: string;
  artist: string;
  duration: number;
  bitrate: string;
  size: number;
  md5: string;
}

export interface MatchedFile extends LocalMusicFile {
  aid: number;
  id: number;
  coverid: string;
  ncmName: string;
  ncmAlbum: string;
}
