import { decodeBody, encodeParams } from "../dependencies/ncm_crypto/eapi.ts";
import { ArtistAlbumsAPI } from "./artist_albums.type.ts";
import type { ID } from "./id.ts";
import type { Page } from "./page.ts";
import { iosHeaders } from "./_api_headers.ts";
import type { Cookie } from "./_cookie.ts";
import { refreshCookieFromResponse } from "./_cookie.ts";

const defaultPage: Page = {
  limit: 1000,
  offset: 0,
  total: true,
};

export const artistAlbums = async (
  id: ID,
  page: Page = defaultPage,
  cookie?: Cookie,
): Promise<ArtistAlbumsAPI> => {
  const params = await encodeParams(`/api/artist/albums/${id}`, {
    e_r: true,
    ...page,
  });

  const search = new URLSearchParams({
    params,
  });

  const response = await fetch(
    `http://music.163.com/eapi/artist/albums/${id}`,
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

  artistAlbums(161644, undefined, cookie).then((r) =>
    console.log(JSON.stringify(r, null, 2))
  );
}
