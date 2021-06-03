import {
  decodeBody,
  encodeParams,
} from "https://deno.land/x/ncm_crypto@v0.0.2/eapi.ts";
import { CloudApi } from "./cloud.type.ts";
import type { Cookie } from "./cookie.ts";
import { refreshCookieFromResponse } from "./cookie.ts";

export * from "./cloud.type.ts";

export const cloud = async (
  cookie: Cookie,
  limit = 1000,
  offset = 0,
): Promise<CloudApi> => {
  const params = await encodeParams("/api/v1/cloud/get", {
    e_r: true,
    limit,
    offset,
  });

  const search = new URLSearchParams({
    params,
  });

  const response = await fetch("http://music.163.com/eapi/v1/cloud/get", {
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

  cloud(cookie, 1).then((r) => console.log(JSON.stringify(r, null, 2)));
}
