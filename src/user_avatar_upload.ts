import { weapi } from "../dependencies/ncm_crypto/weapi.ts";
import { iosHeaders } from "./_api_headers.ts";
import { Cookie, refreshCookieFromResponse } from "./_cookie.ts";

export const usetAvatarUpload = async (
  imgid: string,
  cookie: Cookie,
): Promise<unknown> => {
  const params = await weapi({ imgid });

  const search = new URLSearchParams(params);

  const response = await fetch(
    "http://music.163.com/weapi/user/avatar/upload/v1",
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

  return response.json();
};
