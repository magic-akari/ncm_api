import { decodeBody, encodeParams } from "../dependencies/ncm_crypto/eapi.ts";
import { iosHeaders } from "./api_headers.ts";
import type { Cookie } from "./cookie.ts";
import { refreshCookieFromResponse } from "./cookie.ts";
import type { ID } from "./id.ts";

export interface AlbumSubAPI {
  code: number;
  time?: number;
  message?: string;
}

export const albumSub = async (
  id: ID,
  cookie: Cookie,
): Promise<AlbumSubAPI> => {
  const params = await encodeParams("/api/album/sub", {
    e_r: true,
    id,
  });

  const search = new URLSearchParams({
    params,
  });

  const response = await fetch("http://music.163.com/eapi/album/sub", {
    method: "POST",
    headers: {
      ...iosHeaders,
      Cookie: cookie?.current!,
    },
    body: search,
  });

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

  albumSub(87504270, cookie).then((r) =>
    console.log(JSON.stringify(r, null, 2))
  );
}
