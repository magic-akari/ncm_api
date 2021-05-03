import {
  decodeBody,
  encodeParams,
} from "https://deno.land/x/ncm_crypto@v0.0.2/eapi.ts";
import { Cookie, refreshCookieFromResponse } from "./cookie.ts";
import { LocalMusicFile } from "./file.type.ts";

export interface TokenAllocResult {
  bucket: string;
  token: string;
  objectKey: string;
  resourceId: number;
}

export const nosTokenAlloc = async (
  file: LocalMusicFile,
  cookie: Cookie,
): Promise<TokenAllocResult> => {
  const params = await encodeParams("/api/nos/token/alloc", {
    bucket: "",
    ext: file.filename.split(".").pop(),
    filename: file.filename,
    fileSize: file.size,
    nos_product: 3,
    type: "audio",
    local: false,
    md5: file.md5,
    e_r: true,
  });

  const search = new URLSearchParams({
    params,
  });

  const response = await fetch(
    "http://interface3.music.163.com/eapi/nos/token/alloc",
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
    .then(JSON.parse)
    .then(({ result }) => result as TokenAllocResult);
};
