import { decodeBody, encodeParams } from "../dependencies/ncm_crypto/eapi.ts";
import type { ID } from "./id.ts";
import { iosHeaders } from "./_api_headers.ts";
import { Cookie, refreshCookieFromResponse } from "./_cookie.ts";

export interface PlaylistDescUpdateParams extends Record<string, unknown> {
  id: ID;
  desc: string;
}

export const playlistDescUpdate = async (
  updateParams: PlaylistDescUpdateParams,
  cookie: Cookie,
) => {
  const params = await encodeParams("/api/playlist/desc/update", {
    e_r: true,
    ...updateParams,
  });

  const search = new URLSearchParams({
    params,
  });

  const response = await fetch(
    "http://interface3.music.163.com/eapi/playlist/desc/update",
    {
      method: "POST",
      headers: {
        ...iosHeaders,
        Cookie: cookie.current! + "; os=osx;",
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
