import { encodeParams } from "https://deno.land/x/ncm_crypto@v0.0.2/eapi.ts";
import { LocalMusicFile } from "./file.type.ts";
import { MatchAPI } from "./match.type.ts";

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
  return fetch("https://music.163.com/eapi/search/match/new", {
    method: "POST",
    headers: {
      Host: "music.163.com",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) NeteaseMusicDesktop/2.3.4.848",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: search,
  }).then((a) => a.json());
};
