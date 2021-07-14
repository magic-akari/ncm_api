import { decodeBody, encodeParams } from "../dependencies/ncm_crypto/eapi.ts";
import { iosHeaders } from "./api_headers.ts";
import type { Cookie } from "./cookie.ts";
import { refreshCookieFromResponse } from "./cookie.ts";
import type { StyleTagHomeAlbum } from "./style_tag_home_album.type.ts";

export * from "./style_tag_home_album.type.ts";

export interface StyleTagHomeAlbumParams {
  cursor?: number;
  size?: number;
  sort?: 0 | 1;
}

export const styleTagHomeAlbum = async (
  tagId: number,
  options?: StyleTagHomeAlbumParams,
  cookie?: Cookie,
): Promise<StyleTagHomeAlbum> => {
  const params = await encodeParams("/api/style-tag/home/album", {
    tagId,
    cursor: options?.cursor ?? 0,
    sort: options?.sort ?? 0,
    size: options?.size ?? 2000,
    e_r: true,
  });

  const search = new URLSearchParams({
    params,
  });
  const response = await fetch(
    "http://interface3.music.163.com/eapi/style-tag/home/album",
    {
      method: "POST",
      headers: {
        ...iosHeaders,
        Cookie: cookie?.current!,
      },
      body: search,
    },
  );

  refreshCookieFromResponse(response, cookie);

  return response
    .arrayBuffer()
    .then((ab) => new Uint8Array(ab))
    .then(decodeBody)
    .then(JSON.parse);
};

if (import.meta.main) {
  const cookie = {
    current: Deno.env.get("cookie"),
  };

  styleTagHomeAlbum(5082, { size: 1, sort: 0 }, cookie).then((r) =>
    console.log(JSON.stringify(r, null, 2))
  );
}
