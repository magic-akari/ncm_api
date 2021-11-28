import { weapi } from "../dependencies/ncm_crypto/weapi.ts";
import { iosHeaders } from "./_api_headers.ts";
import type { Cookie } from "./_cookie.ts";
import { refreshCookieFromResponse } from "./_cookie.ts";

interface SearchParam {
  keyword: string;

  /**
   * | value | type |
   * | ----- | ---- |
   * | 1     | 单曲 |
   * | 10    | 专辑 |
   * | 100   | 歌手 |
   * | 1000  | 歌单 |
   * | 1002  | 用户 |
   * | 1004  | MV  |
   * | 1006  | 歌词 |
   * | 1009  | 电台 |
   * | 1014  | 视频 |
   * | 1018  | 综合 |
   */
  type?: number;
  limit?: number;
  offset?: number;
}

export const search = async <T>(
  param: SearchParam,
  cookie?: Cookie,
): Promise<T> => {
  const params = await weapi({
    s: param.keyword,
    type: param.type ?? 1,
    limit: param.limit ?? 10,
    offset: param.offset ?? 0,
  });

  const search = new URLSearchParams(params);

  const response = await fetch("http://music.163.com/weapi/search/get", {
    method: "POST",
    headers: {
      ...iosHeaders,
      Cookie: cookie?.current!,
    },
    body: search,
  });

  refreshCookieFromResponse(response, cookie);

  return response.json().then((r) => r.result);
};

if (import.meta.main) {
  search({ keyword: "なつねいろ。", type: 10 }).then((r) => {
    console.log(JSON.stringify(r, null, 2));
  });
}
