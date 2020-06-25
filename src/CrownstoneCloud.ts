import {REST} from "./rest/cloudAPI";
const crypto = require('crypto');
const shasum = crypto.createHash('sha1');

export let CLOUD_ADDRESS = "https://cloud.crownstone.rocks/api/";
export class CrownstoneCloud {

  email: string = null
  passwordSha1: string = null;
  accessToken : string = null;
  accessTokenExpiration : Date = null;

  hubId : string = null;
  hubToken : string = null;

  constructor(customEndpoint?:string) {
    if (customEndpoint) { CLOUD_ADDRESS = customEndpoint; }
  }

  async login(email: string, password: string) {
    shasum.update(password);
    let hashedPassword = shasum.digest('hex');
    return await this.loginHashed(email, hashedPassword)
  }

  async loginHashed(email: string, hashedPassword: string) {
    let loginResult = await REST.login({
      email: email,
      password: hashedPassword,
      onUnverified: () => { throw "User is unverified."},
      onInvalidCredentials: () => { throw "Invalid username/password."},
    })
    this.accessToken = loginResult.id;
    this.accessTokenExpiration = new Date(new Date().valueOf() + loginResult.ttl*1000);
  }

  _hubLogin() {
    return REST.hubLogin(this.hubId, this.hubToken)
      .then((result) => {
        this.accessToken = result.id;
        this.accessTokenExpiration = new Date(new Date().valueOf() + result.ttl*1000);
      })
      .catch((err) => {
        throw err;
      })
  }

  async hubLogin(hubId: string, hubToken: string) {
    this.hubToken = hubToken;
    this.hubId = hubId;
    return this._hubLogin()

  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }
}