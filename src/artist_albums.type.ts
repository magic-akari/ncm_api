import { Album, Artist } from "./album.type.ts";

export interface ArtistAlbumsAPI {
  artist: Artist;
  hotAlbums: Album[];
  more: boolean;
  code: number;
}
