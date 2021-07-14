import { decodeBody, encodeParams } from "../dependencies/ncm_crypto/eapi.ts";
import { iosHeaders } from "./api_headers.ts";
import type { Cookie } from "./cookie.ts";
import { refreshCookieFromResponse } from "./cookie.ts";
import { ID } from "./id.ts";
import type { PlaylistAPI } from "./playlist.type.ts";

export const playlistDetail = async (
  pid: ID,
  cookie?: Cookie,
): Promise<PlaylistAPI> => {
  const params = await encodeParams("/api/v6/playlist/detail", {
    e_r: true,
    id: pid.toString(),
    n: "100000",
    s: "0",
  });

  const search = new URLSearchParams({
    params,
  });

  const response = await fetch("http://music.163.com/eapi/v6/playlist/detail", {
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

  playlistDetail(Deno.args[0], cookie).then((result) => {
    console.log(JSON.stringify(result, null, 4));
  });
}
