import got from "got";
import {RequestorBase} from "../requestorBase";

export class HubRequests extends RequestorBase {

  async hubLogin() : Promise<cloud_LoginReply> {
    const {body} = await got.post(`${this.endpoint}Hubs/${this.tokenStore.cloudHub.hubId}/login`, {
      searchParams: {
        token: this.tokenStore.cloudHub.hubToken
      },
      responseType: 'json'
    });
    return body;
  }
}
