import { readAll } from "../dependencies/std/streams/mod.ts";
import { pcHeaders } from "./_api_headers.ts";
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
    `${ip}/${tokenResult.bucket || "ymusic"}/${
      encodeURIComponent(
        tokenResult.objectKey,
      )
    }?offset=0&complete=true&version=1.0`,
    {
      method: "POST",
      headers: {
        ...pcHeaders,
        "User-Agent": "neteasemusic/8.2.50 (iPhone; iOS 14.6; Scale/2.00)",
        "x-nos-token": tokenResult.token,
        "Content-MD5": file.md5,
        "Content-Type": "audio/mpeg",
        "Content-Length": file.size.toString(),
      },
      body,
    },
  ).then((r) => r.json());
};
