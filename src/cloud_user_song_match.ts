import { weapi } from "../dependencies/ncm_crypto/weapi.ts";
import { iosHeaders } from "./api_headers.ts";
import type { Cookie } from "./cookie.ts";
import { refreshCookieFromResponse } from "./cookie.ts";

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
