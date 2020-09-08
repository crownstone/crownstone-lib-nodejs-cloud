import {CloudRequestorInterface} from "../tools/requestors";
import {Spheres} from "./spheres";
import {SphereUsers} from "./sphereUsers";


export class Sphere extends Spheres {

  rest: CloudRequestorInterface;
  filter = null;
  sphereId = null;

  constructor(cloudRequestor: CloudRequestorInterface, filter: filter = null, id = null) {
    super(cloudRequestor, filter, id);
    this.rest = cloudRequestor;
    this.filter = filter;
    if (id) { this.sphereId = id; }
  }

  async resolveIdentifier() : Promise<void> {
    await super.resolveIdentifier();
    console.log(this.sphereIds)
    if (this.sphereIds.length > 1) {
      throw "Too many spheres fit this filter. Be more specific."
    }
    if (this.sphereIds.length === 1) {
      this.sphereId = this.sphereIds[0];
    }
    else {
      this.sphereId = null;
    }
  }

  users() : SphereUsers {
    return new SphereUsers(this.rest, this);
  }

  async authorizationTokens() : Promise<cloud_SphereAuthorizationTokens> {
    if (this.sphereIds.length == 0) {
      await this.resolveIdentifier();
      return this.authorizationTokens()
    }
    else if (this.sphereIds.length !== 1) {
      throw "You can only get tokens for a single Sphere.";
    }
    return await this.rest.getSphereAuthorizationTokens(this.sphereIds[0]);
  }

  async downloadSphere(): Promise<cloud_Sphere> {
    let sphere;
    if (this.rest.isUser()) {
      sphere = await this.rest.getSphere(this.sphereId)
    }
    else if (this.rest.isHub()) {
      sphere = [await this.rest.getHubSphere()];
    }

    if (sphere) {
      this.rest.cache.spheres[sphere.id] = sphere;
    }
    return sphere;
  }

  async refresh() {
    if (this.sphereId === null) {
      await this.resolveIdentifier()
    }
    await this.downloadSphere()
    return this;
  }
}