import got from "got";
import {RequestorBase} from "../requestorBase";


export class SphereRequests extends RequestorBase {

  async getSpheres() : Promise<cloud_Sphere[]> {
    const {body} = await got.get(`${this.endpoint}users/${this.tokenStore.cloudUser.userId}/spheres`, this.addSecurity({responseType: 'json' }));

    this.cache.downloadedAll['spheres'] = true;
    return body as any;
  }

  async getSphere(sphereId) : Promise<cloud_Sphere> {
    const {body} = await got.get(`${this.endpoint}Spheres/${sphereId}`, this.addSecurity({ responseType: 'json' }));
    return body as any;
  }

  async getHubSphere() : Promise<cloud_Sphere> {
    if (this.tokenStore.cloudHub.hubId    === undefined) { throw "No Hub loaded."; }
    let sphereId = undefined;
    if (this.tokenStore.cloudHub.sphereId === undefined) {
      let {body} = await got.get(`${this.endpoint}Hubs/${this.tokenStore.cloudHub.hubId}`, this.addSecurity({ responseType: 'json' }));
      let hubData = body as any;
      this.cache.hubs[hubData.id] = hubData;
      sphereId = hubData.sphereId;
    }
    return this.getSphere(sphereId);
  }

}


