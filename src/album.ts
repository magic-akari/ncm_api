import type { AlbumAPI } from "./album.type.ts";
import { iosHeaders } from "./_api_headers.ts";
import type { Cookie } from "./_cookie.ts";
import { refreshCookieFromResponse } from "./_cookie.ts";
import type { ID } from "./id.ts";

export * from "./album.type.ts";

export const album = async (aid: ID, cookie?: Cookie): Promise<AlbumAPI> => {
  const response = await fetch(`http://music.163.com/api/v1/album/${aid}`, {
    method: "GET",
    headers: {
      ...iosHeaders,
      Cookie: cookie?.current!,
    },
  });

  refreshCookieFromResponse(response, cookie);

  return response.json();
};

if (import.meta.main) {
  album("35919025").then((r) => console.log(JSON.stringify(r, null, 2)));
}
