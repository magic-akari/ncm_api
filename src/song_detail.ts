import { decodeBody, encodeParams } from "../dependencies/ncm_crypto/eapi.ts";
import { iosHeaders } from "./api_headers.ts";
import type { Cookie } from "./cookie.ts";
import { refreshCookieFromResponse } from "./cookie.ts";
import type { ID } from "./id.ts";
import type { SongDetailAPI } from "./song.type.ts";

export const songDetail = async (
  ids: ID[],
  cookie?: Cookie,
): Promise<SongDetailAPI> => {
  const params = await encodeParams("/api/v3/song/detail", {
    e_r: true,
    c: JSON.stringify(ids.map((id) => ({ id: Number(id) }))),
  });

  const search = new URLSearchParams({
    params,
  });

  const response = await fetch("http://music.163.com/eapi/v3/song/detail", {
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
  songDetail(["536570516", 536623510]).then(console.log);
}
