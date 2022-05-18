import { decodeBody, encodeParams } from "../dependencies/ncm_crypto/eapi.ts";
import type { CommentInfoLikeListAPI } from "./comment_info_like_list.type.ts";
import { iosHeaders } from "./_api_headers.ts";
import type { Cookie } from "./_cookie.ts";
import { refreshCookieFromResponse } from "./_cookie.ts";
export * from "./comment_info_like_list.type.ts";

export const commentInfoLikeList = async (
  threadId: string,
  pagesize = 20,
  pagenum = 1,
  cookie?: Cookie,
): Promise<CommentInfoLikeListAPI> => {
  const params = await encodeParams("/api/v1/resource/commentinfo/likelist", {
    e_r: true,
    threadId,
    pagesize,
    pagenum,
  });

  const search = new URLSearchParams({
    params,
  });

  const response = await fetch(
    "http://music.163.com/eapi/v1/resource/commentinfo/likelist",
    {
      method: "POST",
      headers: {
        ...iosHeaders,
        Cookie: cookie?.current!,
      },
      body: search,
    },
  );

  refreshCookieFromResponse(response, cookie);

  return response
    .arrayBuffer()
    .then((ab) => new Uint8Array(ab))
    .then(decodeBody)
    .then(JSON.parse);
};

if (import.meta.main) {
  const threadId = Deno.args[0];

  commentInfoLikeList(threadId, 100, 1).then((r) =>
    console.log(JSON.stringify(r, null, 2))
  );
}
