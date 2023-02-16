import NgPrM from "./dto";
import { requestFactory } from "./util";

export const getTokenRequest = requestFactory("/api/tokens", "POST", {
  identity: process.env.NGINX_PROXY_MANAGER_SA_EMAIL,
  secret: process.env.NGINX_PROXY_MANAGER_SA_SECRET,
});

export const getHostsRequest = (token: string) =>
  requestFactory("/api/nginx/proxy-hosts", "GET", undefined, token)();

export const updateHostRequest = (id: number, forwardHost: string, token: string) =>
  requestFactory(
    `/api/nginx/proxy-hosts/${id}`,
    "PUT",
    {
      forward_host: forwardHost,
    },
    token
  )();
