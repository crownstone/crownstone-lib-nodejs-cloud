import got from "got";
import {RequestorBase} from "../requestorBase";

export class WebhookRequests extends RequestorBase {

  async isListenerActive(token: string) : Promise<boolean> {
    const {body} = await got.get(`${this.endpoint}listeners/active`, { ...this.hookSecurityApi, searchParams: {token: token} , responseType: 'json' });
    return body;
  }


  async createListener(userId: string, token: string, eventTypes: string[], url: string) : Promise<void> {
    await got.post(`${this.endpoint}listeners`, {
      json: { userId, token, eventTypes, url },
      ...this.hookSecurityApi,
      responseType: 'json'
    });
  }


  async getListeners() : Promise<cloud_EventListener[]> {
    const {body} = await got.get(`${this.endpoint}listeners`, {
      ...this.hookSecurityApi,
      responseType: 'json'
    });
    return body;
  }

  async deleteListenerByToken(token: string) : Promise<void> {
    const {body} = await got.delete(`${this.endpoint}listeners/token`, {
      ...this.hookSecurityApi,
      searchParams: { token: token},
      responseType: 'json'
    });
    return body;
  }

}

