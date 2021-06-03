import {
  decodeBody,
  encodeParams,
} from "https://deno.land/x/ncm_crypto@v0.0.2/eapi.ts";
import type { Cookie } from "./cookie.ts";
import { refreshCookieFromResponse } from "./cookie.ts";
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
      Host: "music.163.com",
      "Content-Type": "application/x-www-form-urlencoded",
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
