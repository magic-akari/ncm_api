import { weapi } from "../dependencies/ncm_crypto/weapi.ts";
import { iosHeaders } from "./_api_headers.ts";
import type { Cookie } from "./_cookie.ts";
import { refreshCookieFromResponse } from "./_cookie.ts";

export interface MatchParam extends Record<string, number> {
  songId: number;
  adjustSongId: number;
  userId: number;
}

export const cloudUserSongMatch = async (
  matchParam: MatchParam,
  cookie: Cookie,
) => {
  const params = await weapi(matchParam);

  const search = new URLSearchParams(params);

  const response = await fetch(
    "http://music.163.com/weapi/cloud/user/song/match",
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

  return response.json();
};
