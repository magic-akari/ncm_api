import type { SimpleAlbum } from "./album.type.ts";

interface Page {
  cursor: number;
  size: number;
  more: boolean;
  total: number;
}

export interface StyleTagHomeAlbum {
  data: {
    albums: SimpleAlbum[];
    page: Page;
  };
  code: number;
}
