import { weapi } from "../dependencies/ncm_crypto/weapi.ts";
import { PlaylistRecoverTrackListAPI } from "./playlist_recover_track_list.type.ts";
import { iosHeaders } from "./_api_headers.ts";
import { Cookie, refreshCookieFromResponse } from "./_cookie.ts";

export interface PlaylistRecoverTrackListPayload {
  playlistId: string;
  deleteTrackTime?: number;
  limit?: number;
}

export type { PlaylistRecoverTrackListAPI };

export const playlistRecoverTrackList = async (
  payload: PlaylistRecoverTrackListPayload,
  cookie: Cookie,
): Promise<PlaylistRecoverTrackListAPI> => {
  const params = await weapi({
    deleteTrackTime: 0,
    limit: 1000,
    ...payload,
  });

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
    "https://interface.music.163.com/weapi/playlist/recover/track/list",
    options,
  );

  refreshCookieFromResponse(response, cookie);

  return response.json();
};

if (import.meta.main) {
  const cookie = {
    current: Deno.env.get("cookie"),
  };

  playlistRecoverTrackList(
    { playlistId: Deno.args[0], limit: 2000 },
    cookie,
  ).then((result) => {
    console.log(JSON.stringify(result, null, 4));
  });
}
