import { readAll } from "https://deno.land/std@0.95.0/io/util.ts";
import type { LocalMusicFile } from "./file.type.ts";
import { uploadIP } from "./lbs.ts";
import type { TokenAllocAudioResult } from "./nos_token_alloc.ts";

export const ymusic = async (
  file: LocalMusicFile,
  tokenResult: TokenAllocAudioResult,
) => {
  const [ip, body] = await Promise.all([
    uploadIP(),
    Deno.open(file.path, { read: true }).then(readAll),
  ]);

  return fetch(
    `${ip}/ymusic/${
      encodeURIComponent(
        tokenResult.objectKey,
      )
    }?offset=0&complete=true&version=1.0`,
    {
      method: "POST",
      headers: {
        "x-nos-token": tokenResult.token,
        "Content-MD5": file.md5,
        "Content-Type": "audio/mpeg",
        "Content-Length": file.size.toString(),
      },
      body,
    },
  ).then((r) => r.json());
};
