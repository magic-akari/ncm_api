import {
  decodeBody,
  encodeParams,
} from "https://deno.land/x/ncm_crypto@v0.0.2/eapi.ts";
import type { Cookie } from "./cookie.ts";
import { refreshCookieFromResponse } from "./cookie.ts";
import type { ID } from "./id.ts";

export const playlistManipulateTracks = async (
  pid: ID,
  ids: ID[],
  op: "add" | "del" | "update",
  cookie: Cookie,
) => {
  const params = await encodeParams("/api/playlist/manipulate/tracks", {
    e_r: true,
    pid: pid.toString(),
    trackIds: `[${ids.join(",")}]`,
    op: op,
  });

  const search = new URLSearchParams({
    params,
  });

  const response = await fetch(
    "http://music.163.com/eapi/playlist/manipulate/tracks",
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

export const playlistAddTracks = (pid: ID, ids: ID[], cookie: Cookie) => {
  return playlistManipulateTracks(pid, ids, "add", cookie);
};

export const playlistDelTracks = (pid: ID, ids: ID[], cookie: Cookie) => {
  return playlistManipulateTracks(pid, ids, "del", cookie);
};

export const playlistUpdateTracks = (pid: ID, ids: ID[], cookie: Cookie) => {
  return playlistManipulateTracks(pid, ids, "update", cookie);
};
