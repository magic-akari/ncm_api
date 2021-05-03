import { weapi } from "https://deno.land/x/ncm_crypto@v0.0.2/weapi.ts";
import { Cookie, refreshCookieFromResponse } from "./cookie.ts";

export interface MatchParam extends Record<string, number> {
  songId: number;
  adjustSongId: number;
  userId: number;
}

export const userSongMatch = async (matchParam: MatchParam, cookie: Cookie) => {
  const params = await weapi(matchParam);

  const search = new URLSearchParams(params);

  const response = await fetch(
    "https://music.163.com/weapi/cloud/user/song/match",
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

  return response.json();
};
