import { decodeBody, encodeParams } from "../dependencies/ncm_crypto/eapi.ts";
import { iosHeaders } from "./_api_headers.ts";
import type { Cookie } from "./_cookie.ts";
import { refreshCookieFromResponse } from "./_cookie.ts";
import type { ID } from "./id.ts";

export const cloudPub = async (
  songid: ID,
  cookie: Cookie,
): Promise<unknown> => {
  const params = await encodeParams("/api/cloud/pub/v2", {
    songid: songid.toString(),
    e_r: true,
  });

  const search = new URLSearchParams({
    params,
  });

  const response = await fetch(
    "http://interface.music.163.com/eapi/cloud/pub/v2",
    {
      method: "POST",
      headers: {
        ...iosHeaders,
        Cookie: cookie.current!,
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
