import { decodeBody, encodeParams } from "../dependencies/ncm_crypto/eapi.ts";
import { iosHeaders } from "./_api_headers.ts";
import { Cookie, refreshCookieFromResponse } from "./_cookie.ts";
import type { ID } from "./id.ts";
import type { PlaylistSubscribers } from "./playlist_subscribers.type.ts";

export * from "./playlist_subscribers.type.ts";

export const playlistSubscribers = async (
  id: ID,
  limit = 60,
  offset = 0,
  cookie?: Cookie,
): Promise<PlaylistSubscribers> => {
  const params = await encodeParams("/api/playlist/subscribers", {
    id: id.toString(),
    e_r: true,
    limit: limit.toString(),
    offset: offset.toString(),
  });

  const search = new URLSearchParams({
    params,
  });

  const response = await fetch(
    "http://music.163.com/eapi/playlist/subscribers",
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

  playlistSubscribers(Deno.args[0], 60, 0, cookie).then(console.log);
}
