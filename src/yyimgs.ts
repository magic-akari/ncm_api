import { readAll } from "../dependencies/std/io/util.ts";
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
