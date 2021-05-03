import { encodeParams } from "https://deno.land/x/ncm_crypto@v0.0.2/eapi.ts";
import { Cookie, refreshCookieFromResponse } from "./cookie.ts";
import { LocalMusicFile } from "./file.type.ts";

export interface UploadCheckResult {
  songId: string;
  needUpload: boolean;
}

export const uploadCheck = async (
  file: LocalMusicFile,
  cookie: Cookie,
): Promise<UploadCheckResult> => {
  const params = await encodeParams("/api/cloud/upload/check", {
    bitrate: file.bitrate,
    ext: "." + file.filename.split(".").pop(),
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
      Host: "music.163.com",
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: cookie.current!,
    },
    body: search,
  });

  refreshCookieFromResponse(response, cookie);

  return response.json();
};