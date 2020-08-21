import got from "got";
import {RequestorBase} from "../requestorBase";
import {gotAllInSphere} from "../cache";


let filter = {searchParams: JSON.stringify({})}

export class LocationRequests extends RequestorBase {

  async getLocations() : Promise<cloud_Location[]> {
    const {body} = await got.get(`${this.endpoint}Locations/all`, { ...filter, ...this.security, responseType: 'json' });

    this.cache.downloadedAll['locations'] = true;
    return body;
  }

  async getLocationsInSphere(sphereId) : Promise<cloud_Location[]> {
    const {body} = await got.get(`${this.endpoint}Spheres/${sphereId}/ownedLocations`, { ...filter, ...this.security, responseType: 'json' });
    gotAllInSphere(this.cache,sphereId,'locations');
    return body;
  }

  async getLocation(stoneId) : Promise<cloud_Location> {
    const {body} = await got.get(`${this.endpoint}Locations/${stoneId}`, { ...filter, ...this.security, responseType: 'json' });
    return body;
  }
}

