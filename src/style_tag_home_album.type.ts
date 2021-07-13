import type { Album } from "./album.type.ts";

interface Page {
  cursor: number;
  size: number;
  more: boolean;
  total: number;
}

export interface StyleTagHomeAlbum {
  data: {
    albums: Album[];
    page: Page;
  };
  code: number;
}
