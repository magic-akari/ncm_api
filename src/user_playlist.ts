import { decodeBody, encodeParams } from "../dependencies/ncm_crypto/eapi.ts";
import { iosHeaders } from "./_api_headers.ts";
import { Cookie, refreshCookieFromResponse } from "./_cookie.ts";
import type { ID } from "./id.ts";
import { Playlist } from "./playlist.type.ts";

export type { Playlist };

export const userPlaylist = async (
  uid: ID,
  cookie?: Cookie,
): Promise<{ playlist: Playlist[] }> => {
  const params = await encodeParams("/api/user/playlist/", {
    e_r: true,
    limit: "1000",
    offset: "0",
    uid: uid.toString(),
  });

  const search = new URLSearchParams({
    params,
  });

  const response = await fetch("http://music.163.com/eapi/user/playlist/", {
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
  userPlaylist(Deno.args[0]).then(console.log);
}
