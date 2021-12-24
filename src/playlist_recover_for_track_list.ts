import { weapi } from "../dependencies/ncm_crypto/weapi.ts";
import { PlaylistRecoverForTrackListAPI } from "./playlist_recover_for_track_list.type.ts";
import { iosHeaders } from "./_api_headers.ts";
import { Cookie, refreshCookieFromResponse } from "./_cookie.ts";

export interface PlaylistRecoverForTrackListPayload {
  limit?: number;
  recentDeleteTime?: number;
}

export const playlistRecoverForTrackList = async (
  payload: PlaylistRecoverForTrackListPayload,
  cookie: Cookie,
): Promise<PlaylistRecoverForTrackListAPI> => {
  const params = await weapi({ limit: 1000, recentDeleteTime: 0, ...payload });

  const search = new URLSearchParams(params);

  const options = {
    method: "POST",
    headers: {
      ...iosHeaders,
      Cookie: cookie.current!,
    },
    body: search,
  };

  const response = await fetch(
    "https://interface.music.163.com/weapi/playlist/recover/for/track/list",
    options,
  );

  refreshCookieFromResponse(response, cookie);

  return response.json();
};

if (import.meta.main) {
  const cookie = {
    current: Deno.env.get("cookie"),
  };

  playlistRecoverForTrackList({}, cookie).then((result) => {
    console.log(JSON.stringify(result, null, 4));
  });
}
