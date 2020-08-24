import { Toolchain }                 from "./tools/toolchain";
import { WebhookRequestorInterface } from "./tools/requestors";

export class CrownstoneWebhooks {

  toolchain : Toolchain;
  rest: WebhookRequestorInterface;

  constructor(customEndpoint?:string) {
    this.toolchain = new Toolchain();
    this.rest = this.toolchain.getWebhookRequestor(customEndpoint);
  }

  setApiKey(apiKey: string) {
    this.toolchain.tokenStore.webhooks.api_key = apiKey;
  }

  setAdminKey(adminKey: string) {
    this.toolchain.tokenStore.webhooks.admin_key = adminKey;
  }

  async isListenerActive(token: string) : Promise<boolean> {
    return await this.rest.isListenerActive(token)
  }

}