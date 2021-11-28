import { decodeBody, encodeParams } from "../dependencies/ncm_crypto/eapi.ts";
import { iosHeaders } from "./_api_headers.ts";
import type { Cookie } from "./_cookie.ts";
import { refreshCookieFromResponse } from "./_cookie.ts";
import type { ID } from "./id.ts";

export interface albumUnsubAPI {
  code: number;
  time?: number;
  message?: string;
}

export const albumUnsub = async (
  id: ID,
  cookie: Cookie,
): Promise<albumUnsubAPI> => {
  const params = await encodeParams("/api/album/unsub", {
    e_r: true,
    id,
  });

  const search = new URLSearchParams({
    params,
  });

  const response = await fetch("http://music.163.com/eapi/album/unsub", {
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

  albumUnsub(87504270, cookie).then((r) =>
    console.log(JSON.stringify(r, null, 2))
  );
}
