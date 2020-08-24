import {Toolchain} from "./tools/toolchain";
import {CloudRequestorInterface} from "./tools/requestors";
import {Spheres} from "./dataContainers/Spheres";
import {Locations} from "./dataContainers/locations";
import {Crownstones} from "./dataContainers/crownstones";
const crypto = require('crypto');
const shasum = crypto.createHash('sha1');

interface UserLoginData { accessToken: string, ttl: number, userId: string }
interface HubLoginData  { accessToken: string, ttl: number }

export class CrownstoneCloud {

  toolchain : Toolchain;
  rest: CloudRequestorInterface;

  constructor(customEndpoint?:string) {
    this.toolchain = new Toolchain();
    this.rest = this.toolchain.getCloudRequestor(customEndpoint);
  }

  async login(email: string, password: string) : Promise<UserLoginData> {
    shasum.update(String(password));
    let hashedPassword = shasum.digest('hex');
    return await this.loginHashed(email, hashedPassword)
  }

  async loginHashed(email: string, hashedPassword: string) : Promise<UserLoginData>  {
    this.toolchain.loadUserData(email, hashedPassword);
    let result = await this.rest.login();

    this.toolchain.loadAccessToken(result.id, result.userId);
    return {accessToken: result.id, ttl: result.ttl, userId: result.userId};
  }

  async hubLogin(hubId: string, hubToken: string) : Promise<HubLoginData> {
    this.toolchain.loadHubData(hubId, hubToken);
    let result = await this.rest.hubLogin();

    this.toolchain.loadAccessToken(result.id);
    return {accessToken: result.id, ttl: result.ttl};
  }

  setAccessToken(accessToken: string) {
    this.toolchain.loadAccessToken(accessToken);
  }

  spheres(filter : filter) : Spheres {
    return new Spheres(this.rest, filter)
  }

  locations(filter: filter) : Locations {
    return new Locations(this.rest, null, filter);
  }

  crownstones(filter: filter) : Crownstones {
    return new Crownstones(this.rest, null, null, filter);
  }

  async keys() : Promise<cloud_Keys> {
    if (this.toolchain.cache.keys !== null) {
      return this.toolchain.cache.keys;
    }
    else {
      return this.rest.getKeys()
    }
  }

  async me() : Promise<cloud_User> {
    if (this.toolchain.cache.user !== null) {
      return this.toolchain.cache.user;
    }
    else {
      return this.rest.getUserData()
    }
  }

  async userId() : Promise<cloud_User> {
    if (this.toolchain.cache.user !== null ) {
      return this.toolchain.cache.user.id;
    }
    else if (this.toolchain.tokenStore.cloudUser.userId) {
      return this.toolchain.tokenStore.cloudUser.userId;
    }
    else {
      return this.rest.getUserId()
    }
  }

}

/**
 spheres
 - crownstones
 - locations
 - users
A - keys()
A - data()


 crownstones
A - data
A - turnOn
A - turnOff
A - switch(number)
A - canDim()
A - isLocked()

 locations
 A - data

 users
 A - data

 */