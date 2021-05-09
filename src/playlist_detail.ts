import {
  decodeBody,
  encodeParams,
} from "https://deno.land/x/ncm_crypto@v0.0.2/eapi.ts";
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

  const response = await fetch(
    "http://music.163.com/eapi/v6/playlist/detail",
    {
      method: "POST",
      headers: {
        Host: "music.163.com",
        "Content-Type": "application/x-www-form-urlencoded",
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
  playlistDetail("745510353").then(console.log);
}
