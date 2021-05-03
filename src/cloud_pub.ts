import {
  decodeBody,
  encodeParams,
} from "https://deno.land/x/ncm_crypto@v0.0.2/eapi.ts";
import { Cookie, refreshCookieFromResponse } from "./cookie.ts";

export const cloudPub = async (
  songid: string,
  cookie: Cookie,
): Promise<unknown> => {
  const params = await encodeParams("/api/cloud/pub/v2", {
    songid,
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
        Host: "music.163.com",
        "Content-Type": "application/x-www-form-urlencoded",
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
