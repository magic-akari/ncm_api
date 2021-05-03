import { AlbumAPI } from "./album.type.ts";
import { Cookie, refreshCookieFromResponse } from "./cookie.ts";

export const album = async (
  aid: string | number,
  cookie?: Cookie,
): Promise<AlbumAPI> => {
  const response = await fetch(`https://music.163.com/api/v1/album/${aid}`, {
    method: "GET",
    headers: {
      Host: "music.163.com",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) NeteaseMusicDesktop/2.3.4.848",
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: cookie?.current!,
    },
  });

  refreshCookieFromResponse(response, cookie);

  return response.json();
};

if (import.meta.main) {
  album("35919025").then(console.log);
}
