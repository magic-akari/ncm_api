import { SimpleAlbum } from "./album.type.ts";

export interface AlbumSublistAPI {
  data: SimpleAlbum[];
  count: number;
  hasMore: boolean;
  cover: string;
  paidCount: number;
  code: number;
}
