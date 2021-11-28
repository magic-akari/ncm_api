import { decodeBody, encodeParams } from "../dependencies/ncm_crypto/eapi.ts";
import { iosHeaders } from "./_api_headers.ts";
import { CloudApi } from "./cloud.type.ts";
import type { Cookie } from "./_cookie.ts";
import { refreshCookieFromResponse } from "./_cookie.ts";

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

  cloud(cookie, 1).then((r) => console.log(JSON.stringify(r, null, 2)));
}
