import { decodeBody, encodeParams } from "../dependencies/ncm_crypto/eapi.ts";
import { iosHeaders } from "./_api_headers.ts";
import type { Cookie } from "./_cookie.ts";
import { refreshCookieFromResponse } from "./_cookie.ts";
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
        ...iosHeaders,
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
