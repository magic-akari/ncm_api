import { decodeBody, encodeParams } from "../dependencies/ncm_crypto/eapi.ts";
import type { CommentInfoAPI } from "./comment_info_list.type.ts";
import type { ID } from "./id.ts";
import { iosHeaders } from "./_api_headers.ts";
import type { Cookie } from "./_cookie.ts";
import { refreshCookieFromResponse } from "./_cookie.ts";

export * from "./comment_info_list.type.ts";

export const commentInfoList = async (
  ids: ID[],
  resourceType: ID,
  cookie?: Cookie,
): Promise<CommentInfoAPI> => {
  const params = await encodeParams("/api/resource/commentInfo/list", {
    e_r: true,
    resourceType: resourceType.toString(),
    resourceIds: JSON.stringify(ids.map((id) => Number(id))),
  });

  const search = new URLSearchParams({
    params,
  });

  const response = await fetch(
    "http://music.163.com/eapi/resource/commentInfo/list",
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

export const SongCommentInfoList = (
  ids: ID[],
  cookie?: Cookie,
) => {
  return commentInfoList(ids, 4, cookie);
};

if (import.meta.main) {
  commentInfoList(["536570516", 536623510], 4).then(console.log);
}
