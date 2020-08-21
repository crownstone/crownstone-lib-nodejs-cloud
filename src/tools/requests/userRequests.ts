import got from "got";
import {RequestorBase} from "../requestorBase";


export class UserRequests extends RequestorBase {

  async login() : Promise<cloud_LoginReply> {
    const {body} = await got.post(`${this.endpoint}users/login`, {
      json: {
        email: this.tokenStore.cloudUser.email,
        password: this.tokenStore.cloudUser.passwordSha1,
        ttl: 7*24*3600
      },
      responseType: 'json'
    });
    return body;
  }


  async getKeys() : Promise<cloud_Keys> {
    if (this.tokenStore.cloudUser.userId === undefined) { throw "No user logged in. If you logged in as a hub, remember that hubs cannot get keys."; }

    const {body} = await got.get(`${this.endpoint}users/${this.tokenStore.cloudUser.userId}/keysV2`,  { ...this.security, responseType: 'json' });
    return body;
  }

  async getUserData() : Promise<cloud_UserData> {
    const {body} = await got.get(`${this.endpoint}users/me`,  { ...this.security, responseType: 'json' });
    this.cache.user = body;
    return body;
  }
}


