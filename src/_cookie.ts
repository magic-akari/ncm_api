export interface Cookie {
  current?: string;
}

export const refreshCookieFromResponse = (
  response: Response,
  cookie: Cookie | undefined,
) => {
  if (!cookie) {
    return;
  }

  const newCookie = response.headers.get("set-cookie");

  if (!newCookie) {
    return;
  }

  cookie.current = newCookie;
};
