import { readAll } from "../dependencies/std/streams/mod.ts";
import { iosHeaders } from "./_api_headers.ts";
import type { TokenAllocImageResult } from "./nos_token_alloc.ts";

export const yyimgs = async (
  filePath: string,
  tokenResult: TokenAllocImageResult,
) => {
  const body = await Deno.open(filePath, { read: true }).then(readAll);

  return fetch(
    `https://nosup-hz1.127.net/yyimgs/${
      encodeURIComponent(
        tokenResult.objectKey,
      )
    }?offset=0&complete=true&version=1.0`,
    {
      method: "POST",
      headers: {
        ...iosHeaders,
        "x-nos-token": tokenResult.token,
        "Content-Type": filePath.endsWith(".png") ? "image/png" : "image/jpeg",
      },
      body,
    },
  ).then((r) => r.json());
};

if (import.meta.main) {
  const cookie = {
    current: Deno.env.get("cookie"),
  };

  const { nosTokenAllocImage } = await import(
    "./nos_token_alloc.ts"
  );

  const result: { path: string; url: string }[] = [];

  for (const path of Deno.args) {
    const allocResult = await nosTokenAllocImage(path, cookie);

    await yyimgs(path, allocResult);
    const url = `https://p1.music.126.net/${allocResult.objectKey}.jpg`;
    result.push({ path, url });
  }

  console.table(result);
}
