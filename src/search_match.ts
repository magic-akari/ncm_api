import { encodeParams } from "../dependencies/ncm_crypto/eapi.ts";
import { iosHeaders } from "./api_headers.ts";
import type { LocalMusicFile } from "./file.type.ts";
import type { MatchAPI } from "./match.type.ts";

export const searchMatch = async (
  ...files: LocalMusicFile[]
): Promise<MatchAPI> => {
  const params = await encodeParams("/api/search/match/new", {
    songs: JSON.stringify(
      files.map((f) => {
        return {
          title: f.title,
          album: f.album,
          artist: f.artist,
          duration: f.duration,
          persistId: f.md5,
        };
      }),
    ),
  });
  const search = new URLSearchParams({
    params,
  });
  return fetch("http://music.163.com/eapi/search/match/new", {
    method: "POST",
    headers: iosHeaders,
    body: search,
  }).then((a) => a.json());
};
