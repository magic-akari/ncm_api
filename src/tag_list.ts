import { decodeBody, encodeParams } from "../dependencies/ncm_crypto/eapi.ts";
import { iosHeaders } from "./_api_headers.ts";
import type { Cookie } from "./_cookie.ts";
import { refreshCookieFromResponse } from "./_cookie.ts";
import { TagList } from "./tag_list.type.ts";

export * from "./tag_list.type.ts";

export const tagList = async (cookie?: Cookie): Promise<TagList> => {
  const params = await encodeParams("/api/tag/list/get", {
    e_r: true,
  });

  const search = new URLSearchParams({
    params,
  });
  const response = await fetch(
    "http://interface3.music.163.com/eapi/tag/list/get",
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

  tagList(cookie).then((r) => console.log(JSON.stringify(r, null, 2)));
}
