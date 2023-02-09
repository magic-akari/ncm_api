import { encodeParams } from "../dependencies/ncm_crypto/eapi.ts";
import { extname } from "../dependencies/std/path/mod.ts";
import type { LocalMusicFile } from "./file.type.ts";
import { iosHeaders } from "./_api_headers.ts";
import type { Cookie } from "./_cookie.ts";
import { refreshCookieFromResponse } from "./_cookie.ts";

export interface UploadCheckResult {
  songId: string;
  needUpload: boolean;
}

export const cloudUploadCheck = async (
  file: LocalMusicFile,
  cookie: Cookie,
): Promise<UploadCheckResult> => {
  const params = await encodeParams("/api/cloud/upload/check", {
    bitrate: file.bitrate,
    ext: extname(file.filename),
    length: file.size,
    md5: file.md5,
    songId: "0",
    version: 1,
  });
  const search = new URLSearchParams({
    params,
  });
  const response = await fetch("http://music.163.com/eapi/cloud/upload/check", {
    method: "POST",
    headers: {
      ...iosHeaders,
      Cookie: cookie.current!,
    },
    body: search,
  });

  refreshCookieFromResponse(response, cookie);

  return response.json();
};
