import {RequestorBase} from "../requestorBase";
import {gotAllInSphere} from "../cache";
import {req} from "../../util/request";


let filter = {searchParams: {filter: JSON.stringify({"include":["locations", "currentSwitchState", {"abilities":"properties"}, "behaviours"]})}}

export class CrownstoneRequests extends RequestorBase {

  async getCrownstones() : Promise<cloud_Stone[]> {
    const {body} = await req("GET",`${this.endpoint}Stones/all`,this.addSecurity( { ...filter, responseType: 'json' }));

    this.cache.downloadedAll['crownstones'] = true;
    return body as any;
  }

  async getCrownstonesInSphere(sphereId) : Promise<cloud_Stone[]> {
    const {body} = await req("GET", `${this.endpoint}Spheres/${sphereId}/ownedStones`, this.addSecurity({ ...filter, responseType: 'json' }));
    gotAllInSphere(this.cache,sphereId,'crownstones');
    return body as any;
  }

  async getCrownstone(stoneId) : Promise<cloud_Stone> {
    const {body} = await req("GET",`${this.endpoint}Stones/${stoneId}`, this.addSecurity({ ...filter, responseType: 'json' }));
    return body as any;
  }

  async switchCrownstone(stoneId, switchState: number) : Promise<void> {
    console.log("put", `${this.endpoint}Stones/${stoneId}/setSwitchStateRemotely`, this.addSecurity({ searchParams: { switchState: switchState } }))
    await req("PUT",`${this.endpoint}Stones/${stoneId}/setSwitchStateRemotely`, this.addSecurity({ searchParams: { switchState: switchState } }));
  }

  async getCurrentSwitchState(stoneId) : Promise<cloud_SwitchState> {
    const {body} = await req("GET",`${this.endpoint}Stones/${stoneId}/currentSwitchState`, this.addSecurity({ ...filter, responseType: 'json' }));
    return body as any;
  }
}

