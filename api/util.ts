const ngProxyManagerURL = process.env.NGINX_PROXY_MANAGER_URL;
export const requestFactory =
  (
    url: string,
    method: "POST" | "PUT" | "GET",
    body?: object,
    token?: string
  ) =>
  () =>
    fetch(ngProxyManagerURL + url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? "Bearer " + token : "",
      },
      body: JSON.stringify(body),
    });
