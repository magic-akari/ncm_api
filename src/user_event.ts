import { decodeBody, encodeParams } from "../dependencies/ncm_crypto/eapi.ts";
import type { ID } from "./id.ts";
import type { UserEventApi } from "./user_event.type.ts";
import { iosHeaders } from "./_api_headers.ts";
import type { Cookie } from "./_cookie.ts";
import { refreshCookieFromResponse } from "./_cookie.ts";

export const userEvent = async <T = unknown>(
  userId: ID,
  limit = 30,
  offset = 0,
  cookie?: Cookie,
): Promise<UserEventApi<T>> => {
  const params = await encodeParams(`/api/event/get/${userId}`, {
    userId,
    offset,
    limit,
    time: -1,
    getcounts: true,
    total: false,
    e_r: true,
  });

  const search = new URLSearchParams({
    params,
  });

  const response = await fetch(
    `http://music.163.com/eapi/event/get/${userId}`,
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
  const userId = Number(Deno.args[0]);

  const cookie = {
    current: Deno.env.get("cookie"),
  };

  userEvent(userId, 30, 0, cookie).then((s) =>
    console.log(JSON.stringify(s, null, 2))
  );
}
