import {CloudRequestorInterface} from "../tools/requestors";


export class User {

  rest: CloudRequestorInterface;

  constructor(cloudRequestor: CloudRequestorInterface) {
    this.rest = cloudRequestor;
  }

  async data() : Promise<cloud_UserData> {
    if (this.rest.cache.user === null) {
      await this.rest.getUserData()
      return this.data();
    }
    else {
      return this.rest.cache.user;
    }
  }

  async id() : Promise<string> {
    if (this.rest.cache.user === null && !this.rest.tokenStore.cloudUser.userId) {
      await this.rest.getUserId();
      return this.id();
    }
    else {
      return this.rest.tokenStore.cloudUser.userId || this.rest.cache.user.id;
    }
  }

  async currentLocation() : Promise<cloud_UserLocation> {
    let userId = await this.id();
    return this.rest.getCurrentLocation(userId);
  }

}