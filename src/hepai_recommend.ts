import { decodeBody, encodeParams } from "../dependencies/ncm_crypto/eapi.ts";
import { iosHeaders } from "./_api_headers.ts";
import { Cookie, refreshCookieFromResponse } from "./_cookie.ts";
import type { HepaiRecommendAPI } from "./hepai_recommend.type.ts";

export const hepaiRecommend = async (
  cookie: Cookie,
): Promise<HepaiRecommendAPI> => {
  const params = await encodeParams(
    "/api/vipnewcenter/app/hepai/recommend/get",
    {
      e_r: true,
    },
  );

  const search = new URLSearchParams({
    params,
  });

  const response = await fetch(
    "http://music.163.com/eapi/vipnewcenter/app/hepai/recommend/get",
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

  hepaiRecommend(cookie).then((r) => console.log(JSON.stringify(r, null, 2)));
}
