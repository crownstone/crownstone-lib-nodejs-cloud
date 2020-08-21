import got from "got";
import {RequestorBase} from "../requestorBase";
import {gotAllInSphere} from "../cache";


let filter = {searchParams: JSON.stringify({filter:{"include":["locations", {"abilities":"properties"}, "behaviours"]}})}

export class CrownstoneRequests extends RequestorBase {

  async getCrownstones() : Promise<cloud_Stone[]> {
    const {body} = await got.get(`${this.endpoint}Stones/all`, { ...filter, ...this.security, responseType: 'json' });

    this.cache.downloadedAll['crownstones'] = true;
    return body;
  }

  async getCrownstonesInSphere(sphereId) : Promise<cloud_Stone[]> {
    const {body} = await got.get(`${this.endpoint}Spheres/${sphereId}/ownedStones`, { ...filter, ...this.security, responseType: 'json' });
    gotAllInSphere(this.cache,sphereId,'crownstones');
    return body;
  }

  async getCrownstone(stoneId) : Promise<cloud_Stone> {
    const {body} = await got.get(`${this.endpoint}Stones/${stoneId}`, { ...filter, ...this.security, responseType: 'json' });
    return body;
  }
}

