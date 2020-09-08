import {Toolchain} from "./tools/toolchain";
import {CloudRequestorInterface} from "./tools/requestors";
import {Spheres} from "./dataContainers/Spheres";
import {Locations} from "./dataContainers/locations";
import {Crownstones} from "./dataContainers/crownstones";
import {User} from "./dataContainers/user";
const crypto = require('crypto');
const shasum = crypto.createHash('sha1');


export class CrownstoneCloud {

  toolchain : Toolchain;
  rest: CloudRequestorInterface;

  constructor(customEndpoint?:string) {
    this.toolchain = new Toolchain();
    this.rest = this.toolchain.getCloudRequestor(customEndpoint);
  }

  async login(email: string, password: string) : Promise<UserLoginData> {
    let hashedPassword = this.hashPassword(password);
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

  hashPassword(plaintextPassword: string) : string {
    shasum.update(String(plaintextPassword));
    let hashedPassword = shasum.digest('hex');
    return hashedPassword;
  }

  setAccessToken(accessToken: string, userId?: string) {
    this.toolchain.loadAccessToken(accessToken, userId);
  }

  spheres(filter : filter = null) : Spheres {
    return new Spheres(this.rest, filter)
  }

  locations(filter: filter = null) : Locations {
    return new Locations(this.rest, null, filter);
  }

  crownstones(filter: filter = null) : Crownstones {
    return new Crownstones(this.rest, null, null, filter);
  }

  crownstoneById(id: string) : Crownstones {
    let cs = new Crownstones(this.rest, null, null, id);
    return cs.id(id);
  }

  async keys() : Promise<cloud_Keys[]> {
    if (this.toolchain.cache.keys !== null) {
      return this.toolchain.cache.keys;
    }
    else {
      return await this.rest.getKeys()
    }
  }

  me() : User {
    return new User(this.rest);
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