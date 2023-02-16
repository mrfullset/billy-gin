import dotenv from "dotenv";
dotenv.config();

export default () => {
  if (
    !process.env.NGINX_PROXY_MANAGER_URL ||
    !process.env.NGINX_PROXY_MANAGER_SA_EMAIL ||
    !process.env.NGINX_PROXY_MANAGER_SA_SECRET ||
    !process.env.GREEN_DOMAIN ||
    !process.env.BLUE_DOMAIN ||
    !process.env.A_FORWARD_HOST ||
    !process.env.B_FORWARD_HOST || 
    !process.env.SECRET
  ) {
    throw new Error(
      `All required envs must be set: [NGINX_PROXY_MANAGER_URL,
         NGINX_PROXY_MANAGER_SA_EMAIL, NGINX_PROXY_MANAGER_SA_SECRET,
          GREEN_DOMAIN, BLUE_DOMAIN, A_FORWARD_HOST, B_FORWARD_HOST, SECRET]`
    );
  }
};
