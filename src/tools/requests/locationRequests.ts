import got from "got";
import {RequestorBase} from "../requestorBase";
import {gotAllInSphere} from "../cache";


let filter = {searchParams: {filter: JSON.stringify({})}}

export class LocationRequests extends RequestorBase {

  async getLocations() : Promise<cloud_Location[]> {
    const {body} = await got.get(`${this.endpoint}Locations/all`, this.addSecurity({ ...filter,responseType: 'json' }));

    this.cache.downloadedAll['locations'] = true;
    return body as any;
  }

  async getLocationsInSphere(sphereId) : Promise<cloud_Location[]> {
    const {body} = await got.get(`${this.endpoint}Spheres/${sphereId}/ownedLocations`, this.addSecurity({ ...filter, responseType: 'json' }));
    gotAllInSphere(this.cache,sphereId,'locations');
    return body as any;
  }

  async getLocation(stoneId) : Promise<cloud_Location> {
    const {body} = await got.get(`${this.endpoint}Locations/${stoneId}`, this.addSecurity({ ...filter, responseType: 'json' }));
    return body as any;
  }
}

