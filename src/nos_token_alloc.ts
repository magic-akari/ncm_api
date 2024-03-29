import { decodeBody, encodeParams } from "../dependencies/ncm_crypto/eapi.ts";
import { basename, extname } from "../dependencies/std/path/mod.ts";
import type { LocalMusicFile } from "./file.type.ts";
import { iosHeaders } from "./_api_headers.ts";
import type { Cookie } from "./_cookie.ts";
import { refreshCookieFromResponse } from "./_cookie.ts";

export interface TokenAllocAudioResult {
  bucket: string;
  token: string;
  outerUrl?: string;
  docId?: string;
  objectKey: string;
  resourceId: number;
}

export interface TokenAllocImageResult {
  bucket: string;
  docId: string;
  token: string;
  objectKey: string;
}

export type TokenAllocResult = TokenAllocAudioResult | TokenAllocImageResult;

export const nosTokenAlloc = async (
  data: Record<string, unknown>,
  cookie: Cookie,
): Promise<TokenAllocResult> => {
  const params = await encodeParams("/api/nos/token/alloc", {
    ...data,
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
    .then(JSON.parse)
    .then(({ result }) => result as TokenAllocResult);
};

export const nosTokenAllocAudio = (
  file: LocalMusicFile,
  cookie: Cookie,
): Promise<TokenAllocAudioResult> => {
  const filename = file.filename;
  const ext = extname(filename).slice(1);

  const data = {
    bucket: "",
    ext,
    filename,
    fileSize: file.size,
    nos_product: 3,
    type: "audio",
    local: false,
    md5: file.md5,
  };

  return nosTokenAlloc(data, cookie) as Promise<TokenAllocAudioResult>;
};

export const nosTokenAllocImage = (
  path: string,
  cookie: Cookie,
): Promise<TokenAllocImageResult> => {
  const filename = basename(path);
  const ext = extname(path).slice(1);

  const data = {
    bucket: "yyimgs",
    ext,
    filename,
    local: false,
    nos_product: 0,
    return_body: `{"code":200,"size":"$(ObjectSize)"}`,
    type: "other",
  };

  return nosTokenAlloc(data, cookie) as Promise<TokenAllocImageResult>;
};
