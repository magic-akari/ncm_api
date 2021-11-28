import { decodeBody, encodeParams } from "../dependencies/ncm_crypto/eapi.ts";
import { iosHeaders } from "./_api_headers.ts";
import type { Cookie } from "./_cookie.ts";
import { refreshCookieFromResponse } from "./_cookie.ts";
import type { FriendThroughTrainAPI } from "./friend_through_train.type.ts";

export * from "./friend_through_train.type.ts";

export const friendThroughTrain = async (
  cookie: Cookie,
): Promise<FriendThroughTrainAPI> => {
  const params = await encodeParams("/api/user/friend/through/train/v1/get", {
    scene: "3",
    needTip: "1",
    e_r: true,
  });

  const search = new URLSearchParams({
    params,
  });

  const response = await fetch(
    "http://music.163.com/eapi/user/friend/through/train/v1/get",
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
  const cookie = {
    current: Deno.env.get("cookie"),
  };

  friendThroughTrain(cookie).then((r) =>
    console.log(JSON.stringify(r, null, 2))
  );
}
