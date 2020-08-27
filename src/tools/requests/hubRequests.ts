import {RequestorBase} from "../requestorBase";
import {req} from "../../util/request";

export class HubRequests extends RequestorBase {

  async hubLogin() : Promise<cloud_LoginReply> {
    const {body} = await req("POST",`${this.endpoint}Hubs/${this.tokenStore.cloudHub.hubId}/login`, {
      searchParams: {
        token: this.tokenStore.cloudHub.hubToken
      },
      responseType: 'json'
    });
    return body;
  }
}
