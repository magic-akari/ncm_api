import { encodeParams } from "https://deno.land/x/ncm_crypto@v0.0.2/eapi.ts";
import { UploadCheckResult } from "./cloud_upload_check.ts";
import { Cookie, refreshCookieFromResponse } from "./cookie.ts";
import { MatchedFile } from "./file.type.ts";
import { TokenAllocResult } from "./token_alloc.ts";

export interface uploadCloudInfoParam {
  file: MatchedFile;
  checkResult: UploadCheckResult;
  tokenResult: TokenAllocResult;
}

export interface UploadCloudInfo {
  songId: string;
  exists: boolean;
}

export const uploadCloudInfo = async (
  param: uploadCloudInfoParam,
  cookie: Cookie,
): Promise<UploadCloudInfo> => {
  const { file, tokenResult, checkResult } = param;
  const params = await encodeParams("/api/upload/cloud/info/v2", {
    album: file.album,
    artist: file.artist,
    bitrate: file.bitrate,
    coverid: file.coverid,
    coverId: file.coverid,
    lyricid: file.id,
    // lyricId: file.id,
    filename: file.filename,
    md5: file.md5,
    song: file.title,
    // songfileid: tokenResult.resourceId,
    resourceId: tokenResult.resourceId,
    songid: checkResult.songId,
  });

  const search = new URLSearchParams({
    params,
  });

  const response = await fetch(
    "http://musicupload.netease.com/eapi/upload/cloud/info/v2",
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
