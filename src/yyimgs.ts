import { readAll } from "https://deno.land/std@0.95.0/io/util.ts";
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
        "x-nos-token": tokenResult.token,
        "Content-Type": filePath.endsWith(".png") ? "image/png" : "image/jpeg",
      },
      body,
    },
  ).then((r) => r.json());
};
