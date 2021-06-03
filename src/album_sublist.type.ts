import { Album } from "./album.type.ts";

export interface AlbumSublistAPI {
  data: Album[];
  count: number;
  hasMore: boolean;
  cover: string;
  paidCount: number;
  code: number;
}
