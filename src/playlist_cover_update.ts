import { weapi } from "https://deno.land/x/ncm_crypto@v0.0.2/weapi.ts";
import { Cookie, refreshCookieFromResponse } from "./cookie.ts";
import type { ID } from "./id.ts";

export interface PlaylistCoverUpdateParams extends Record<string, unknown> {
  id: ID;
  coverImgId: string;
}

export const playlistCoverUpdate = async (
  updateParams: PlaylistCoverUpdateParams,
  cookie: Cookie,
) => {
  const params = await weapi(updateParams);

  const search = new URLSearchParams(params);

  const response = await fetch(
    "http://music.163.com/weapi/playlist/cover/update",
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

if (import.meta.main) {
  const pid = Deno.args[0];
  const file = Deno.args[1];

  const cookie = {
    current: Deno.env.get("cookie"),
  };

  const allocResult = await import(
    "./nos_token_alloc.ts"
  ).then(({ nosTokenAllocImage }) => nosTokenAllocImage(file, cookie));

  console.log(allocResult);

  await import("./yyimgs.ts").then(({ yyimgs }) => yyimgs(file, allocResult));

  playlistCoverUpdate({ id: pid, coverImgId: allocResult.docId }, cookie).then(
    console.log,
  );
}
