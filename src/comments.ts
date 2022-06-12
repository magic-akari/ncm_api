import { decodeBody, encodeParams } from "../dependencies/ncm_crypto/eapi.ts";
import { iosHeaders } from "./_api_headers.ts";
import type { Cookie } from "./_cookie.ts";
import type { CommentsAPI } from "./comments.type.ts";
import { refreshCookieFromResponse } from "./_cookie.ts";

export const comments = async <T>(
  id: string,
  limit = 20,
  pageNum = 1,
  cookie?: Cookie,
): Promise<CommentsAPI> => {
  const params = await encodeParams(`/api/v1/resource/comments/${id}`, {
    e_r: true,
    limit,
    pageNum,
  });

  const search = new URLSearchParams({
    params,
  });

  const response = await fetch(
    `http://music.163.com/eapi/v1/resource/comments/${id}`,
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
  comments("A_PL_0_39923867").then((r) => console.log(JSON.stringify(r)));
}
