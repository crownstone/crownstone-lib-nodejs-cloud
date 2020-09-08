import {CloudRequestorInterface} from "../tools/requestors";
import {Sphere} from "./sphere";


export class SphereUsers {

  rest: CloudRequestorInterface;
  sphere: Sphere;

  constructor(cloudRequestor: CloudRequestorInterface, sphere: Sphere) {
    this.rest = cloudRequestor;
    this.sphere = sphere;
  }

  async downloadUsers() {
    let sphereId = this.sphere?.sphereId || null;
    if (sphereId == null) { return; }
    let users = await this.rest.getUsers(sphereId);

    let filteredResult = [];
    this.rest.cache.sphereUsers[sphereId] = users;
    return filteredResult;
  }

  async data() : Promise<cloud_sphereUserDataSet> {
    let sphereId = this.sphere?.sphereId || null;
    if (sphereId === null) {
      // we need to identify the spheres
      await this.sphere.resolveIdentifier();
      return this.data();
    }
    else {
      // all users have been downloaded
      if (this.rest.cache.downloadedAllInSphere[sphereId]?.users) {
        return this.rest.cache.sphereUsers[sphereId];
      }
      // not cached, download now.
      await this.downloadUsers()
      return await this.data();
    }
    throw "No Sphere to get users from.";
  }




}