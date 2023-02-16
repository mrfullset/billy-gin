namespace NgPrM {
  export type Host = {
    id: number;
    created_on: string;
    modified_on: string;
    owner_user_id: number;
    domain_names: string[];
    forward_host: string;
    forward_port: number;
    access_list_id: number;
    certificate_id: number;
    ssl_forced: number;
    caching_enabled: number;
    block_exploits: number;
    advanced_config: string;
    meta: {
      letsencrypt_agree: boolean;
      dns_challenge: boolean;
      nginx_online: boolean;
      nginx_err?: any;
    };
    allow_websocket_upgrade: number;
    http2_support: number;
    forward_scheme: string;
    enabled: number;
    locations: any[];
    hsts_enabled: number;
    hsts_subdomains: number;
  };
}

export default NgPrM;
