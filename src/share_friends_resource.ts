import { decodeBody, encodeParams } from "../dependencies/ncm_crypto/eapi.ts";
import { iosHeaders } from "./_api_headers.ts";
import type { Cookie } from "./_cookie.ts";
import { refreshCookieFromResponse } from "./_cookie.ts";

export interface shareFriendsResourceProps extends Record<string, unknown> {
  id: string;
  type:
    | "song"
    | "album"
    | "playlist"
    | "mv"
    | "djprogram"
    | "djradio"
    | "webview"
    | "noresource";
  msg: string;
  pics?: string;
  videoinfo?: string;
  circleId?: string;
  privacySetting?: number;
  targetPublishTime?: number;
  webviewUrl?: string;
  webviewSubTitle?: string;
  webviewTitle?: string;
  webviewCoverImgUrl?: string;
}

export const shareFriendsResource = async (
  content: shareFriendsResourceProps,
  cookie?: Cookie,
): Promise<unknown> => {
  const params = await encodeParams("/api/share/friends/resource", {
    ...content,
    e_r: true,
  });

  const search = new URLSearchParams({
    params,
  });
  const response = await fetch(
    "http://interface3.music.163.com/eapi/share/friends/resource",
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

  shareFriendsResource(
    {
      id: "28411784",
      type: "song",
      msg: "世界，晚安",
      privacySetting: 2,
    },
    cookie,
  ).then((r) => console.log(JSON.stringify(r, null, 2)));
}
