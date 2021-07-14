import { decodeBody, encodeParams } from "../dependencies/ncm_crypto/eapi.ts";
import { iosHeaders } from "./api_headers.ts";
import type { Cookie } from "./cookie.ts";
import { refreshCookieFromResponse } from "./cookie.ts";
import type { ID } from "./id.ts";
import type { SongeEnhancePlayerUrl } from "./song_enhance_player_url.type.ts";

export const songeEnhancePlayerUrl = async (
  ids: ID[],
  cookie?: Cookie,
): Promise<SongeEnhancePlayerUrl> => {
  const params = await encodeParams("/api/song/enhance/player/url", {
    e_r: true,
    ids: JSON.stringify(ids),
    br: 999000,
  });
  const search = new URLSearchParams({
    params,
  });
  const response = await fetch(
    "http://interface3.music.163.com/eapi/song/enhance/player/url",
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

  songeEnhancePlayerUrl([1434241297, 1434244170], cookie).then((r) =>
    console.log(JSON.stringify(r, null, 2))
  );
}
