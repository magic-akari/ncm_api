import {
  decodeBody,
  encodeParams,
} from "https://deno.land/x/ncm_crypto@v0.0.2/eapi.ts";
import type { Cookie } from "./cookie.ts";
import { refreshCookieFromResponse } from "./cookie.ts";
import type { CommentInfoAPI } from "./comment_info.type.ts";
import type { ID } from "./id.ts";

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
    "https://music.163.com/eapi/resource/commentInfo/list",
    {
      method: "POST",
      headers: {
        Host: "music.163.com",
        "Content-Type": "application/x-www-form-urlencoded",
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
  ids: (string | number)[],
  cookie?: Cookie,
) => {
  return commentInfoList(ids, 4, cookie);
};

if (import.meta.main) {
  commentInfoList(["536570516", 536623510], 4).then(console.log);
}
