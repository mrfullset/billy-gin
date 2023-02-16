import NgPrM from "./dto";
import {
  getHostsRequest,
  getTokenRequest,
  updateHostRequest,
} from "./nginxProxyManager";

export const getToken = async (): Promise<string | undefined> => {
  const response = await getTokenRequest();
  if (!response.ok) {
    return undefined;
  }

  return (await response.json()).token;
};

export const getHosts = async (
  token: string
): Promise<NgPrM.Host[] | undefined> => {
  const response = await getHostsRequest(token);
  if (!response.ok) {
    return undefined;
  }

  return await response.json();
};

export const updateHost = async (
  id: number,
  forwardHost: string,
  token: string
): Promise<NgPrM.Host | undefined> => {
  const response = await updateHostRequest(id, forwardHost, token);
  if (!response.ok) {
    return undefined;
  }

  return await response.json();
};
