import {TokenStore} from "./tokens";
import {CacheStorage} from "./cache";

export class RequestorBase {
  endpoint : string;

  tokenStore : TokenStore;
  cache      : CacheStorage;

  constructor(tokenStore: TokenStore, cache: CacheStorage) {
    this.tokenStore = tokenStore;
    this.cache      = cache;
  }

  setEndpoint(endpoint: string) {
    this.endpoint = endpoint;
  }

  get security() {
    if (this.tokenStore.accessToken) {
      return { headers: { Authorization: this.tokenStore.accessToken }};
    }
    return {};
  }

  get hookSec() {
    if (this.tokenStore.webhooks.admin_key) {
      return { admin_key: this.tokenStore.webhooks.admin_key };
    }
    else if (this.tokenStore.webhooks.api_key) {
      return { api_key: this.tokenStore.webhooks.api_key };
    }
  }
}

