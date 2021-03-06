import { weapi } from "../dependencies/ncm_crypto/weapi.ts";
import type { AlbumSublistAPI } from "./album_sublist.type.ts";
import { iosHeaders } from "./_api_headers.ts";
import type { Cookie } from "./_cookie.ts";
import { refreshCookieFromResponse } from "./_cookie.ts";

export * from "./album_sublist.type.ts";

export interface albumSublistParam extends Record<string, number> {
  limit: number;
  offset: number;
}

export const albumSublist = async (
  cookie: Cookie,
  limit = 1000,
  offset = 0,
): Promise<AlbumSublistAPI> => {
  const params = await weapi({
    limit,
    offset,
  });

  const search = new URLSearchParams(params);

  const response = await fetch("http://music.163.com/weapi/album/sublist", {
    method: "POST",
    headers: {
      ...iosHeaders,
      Cookie: cookie.current!,
    },
    body: search,
  });

  refreshCookieFromResponse(response, cookie);

  return response.json();
};

if (import.meta.main) {
  const cookie = {
    current: Deno.env.get("cookie"),
  };

  albumSublist(cookie).then((r) => console.log(JSON.stringify(r, null, 2)));
}
