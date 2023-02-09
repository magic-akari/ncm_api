import { encodeParams } from "../dependencies/ncm_crypto/eapi.ts";
import { UploadCheckResult } from "./cloud_upload_check.ts";
import type { MatchedFile } from "./file.type.ts";
import type { TokenAllocAudioResult } from "./nos_token_alloc.ts";
import { pcHeaders } from "./_api_headers.ts";
import type { Cookie } from "./_cookie.ts";
import { refreshCookieFromResponse } from "./_cookie.ts";

export interface uploadCloudInfoParam {
  file: MatchedFile;
  checkResult: UploadCheckResult;
  tokenResult: TokenAllocAudioResult;
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
        ...pcHeaders,
        Cookie: cookie.current!,
      },
      body: search,
    },
  );

  refreshCookieFromResponse(response, cookie);

  return response.json();
};
